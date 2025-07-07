import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleInformationService } from '@core/services/vehicle-information.service';
import { SweetAlert } from '@shared/utilities/sweetalert';
import { finalize, Subscription } from 'rxjs';
import { VehicleApiService } from '@core/api/vehicle-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IFolder } from '@shared/types/ifolder.type';

import * as ownerSignals from '@core/state/owner-data.signal';
import { BtnLoaderComponent } from '@shared/components/btn-loader/btn-loader.component';

@Component({
  selector: 'app-vehicle-information',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BtnLoaderComponent,
],
  templateUrl: './vehicle-information.component.html',
  styleUrl: './vehicle-information.component.scss'
})
export class VehicleInformationComponent implements OnInit, OnDestroy {
  
  formVehicle: FormGroup = new FormGroup({});
  disableFields: boolean = false;

  showLoader: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private vehicleService: VehicleInformationService,
    private vehicleApi: VehicleApiService,
  ) {
    effect(() => this.loadSignals());
  }

  private loadSignals(): void {
    this.disableFields = ownerSignals.getDisableFormVehicle();
  }

  ngOnInit(): void {
    this.init();
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private init(): void {
    this.formVehicle = this.vehicleService.loadForm();
  }

  onSubmit(): void {
    // Verificar que los 2 campos esten llenos
    this.showLoader = true;
    const validationFields: boolean = this.validateFields();
    const validateForm: boolean = this.formVehicle.valid;

    // Enviar al back
    if(validationFields && validateForm) {
      const dataFolder: IFolder = this.formVehicle.value as IFolder;
      this.validateFolderFn(dataFolder);
    } else {
      this.showLoader = false;
      SweetAlert.basic("Indica la Carpeta de investigación y complementa con la placa del vehículo o número de serie.", 'warning')
    }
  }

  // Validar la carpeta de investigación
  private validateFolderFn(folder: IFolder) {
    this.subs.add(
      this.vehicleApi.validateFolder(folder)
      .pipe(finalize(() => this.showLoader = false))
      .subscribe({
        next: (resp: boolean) => {
          if(!resp) {
            this.formVehicle.disable()
            this.formVehicle = this.vehicleService.nextStep(this.formVehicle);
          } else {
            SweetAlert.basic("Sus datos ya están registrados\nEn unos días se pondran en contacto con usted", 'success')
          }
        },
        error: (e: HttpErrorResponse) => {
          if(e.status === 409) SweetAlert.basic("Vehiculo no encontrado\nVerifique los datos", 'warning')
          if(e.status >= 500 || e.status === 0) SweetAlert.basic(`Error en el servidor\nEstatus: ${e.status}. Respuesta: ${e.ok}`, 'error')
        },
        
      })
    );
  }

  // Validar los campos
  private validateFields(): boolean {
    const folder: string = String(this.formVehicle.get('folder')?.value).toUpperCase();
    const plate: string = String(this.formVehicle.get('plate')?.value).toUpperCase();
    const serial: string = String(this.formVehicle.get('serial')?.value).toUpperCase();

    if(folder && (plate || serial)) {
      ownerSignals.setFormVehicle(this.formVehicle);

      return true;
    }

    return false;
  }

  /* ========================= METODOS EN EL DOM ========================= */
  // Genera una expresión regular dinámica
  get ForbiddenRegex(): RegExp {
    const forbiddenChars: string[] = this.vehicleService.getForbiddenChars()
    const escaped = forbiddenChars.map(c => '\\' + c).join('');
    return new RegExp(`[${escaped}]`, 'gi'); // 'g' para global, 'i' para may/min
  }
 
  // Genera una expresión regular dinámica
  get ForbiddenRegexFolder(): RegExp {
    const forbiddenChars: string[] = this.vehicleService.getForbiddenCharsFolder()
    const escaped = forbiddenChars.map(c => '\\' + c).join('');
    return new RegExp(`[${escaped}]`, 'gi'); // 'g' para global, 'i' para may/min
  }

  // Evita que se peguen caracteres prohibidos
  onPaste(event: ClipboardEvent): void {
    const pasted = event.clipboardData?.getData('text') ?? '';
    if (this.ForbiddenRegex.test(pasted)) {
      event.preventDefault();
    }
  }

  // Limpia los caracteres si llegan a colarse
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.ForbiddenRegex.test(input.value)) {
      input.value = input.value.replace(this.ForbiddenRegex, '');
    }
  }

  // Evita que se peguen caracteres prohibidos
  onPasteFolder(event: ClipboardEvent): void {
    const pasted = event.clipboardData?.getData('text') ?? '';
    if (this.ForbiddenRegexFolder.test(pasted)) {
      event.preventDefault();
    }
  }

  // Limpia los caracteres si llegan a colarse
  onInputFolder(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.ForbiddenRegexFolder.test(input.value)) {
      input.value = input.value.replace(this.ForbiddenRegexFolder, '');
    }
  }

}
