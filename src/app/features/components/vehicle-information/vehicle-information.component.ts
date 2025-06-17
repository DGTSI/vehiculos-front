import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleInformationService } from '@core/services/vehicle-information.service';
import { SmallMessageComponent } from "@shared/components/small-message/small-message.component";
import { SweetAlert } from '@shared/utilities/sweetalert';
import { finalize, Subscription } from 'rxjs';
import { VehicleApiService } from '@core/api/vehicle-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BtnLoaderComponent } from "@shared/components/btn-loader/btn-loader.component";
import { IFolder } from '@shared/types/ifolder.type';

import * as ownerSignals from '@core/state/owner-data.signal';

@Component({
  selector: 'app-vehicle-information',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SmallMessageComponent,
    BtnLoaderComponent
],
  templateUrl: './vehicle-information.component.html',
  styleUrl: './vehicle-information.component.scss'
})
export class VehicleInformationComponent implements OnInit, OnDestroy {
  
  formVehicle: FormGroup = new FormGroup({});
  isDataOwner: boolean = false;
  showLoader: boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private vehicleService: VehicleInformationService,
    private vehicleApi: VehicleApiService,
  ) {
    effect(() => this.loadSignals());
  }

  ngOnInit(): void {
    this.init();
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private loadSignals(): void {
    this.isDataOwner = ownerSignals.getShowFormUser();
  }

  private init(): void {
    this.formVehicle = this.vehicleService.loadForm();
  }

  // Enviar datos al backend
  onSubmit(): void {
    // console.log(this.formVehicle.value);
    if (this.formVehicle.valid) {
      this.showLoader = true;
      const dataFolder: IFolder = this.formVehicle.value as IFolder;
      const validate: boolean = this.validateFields();

      if(validate) {
        this.validateFolderFn(dataFolder);
      } else {
        this.showLoader = false;
        SweetAlert.basic("FALTA INFO\nDebes ingresar la carpeta de investigación.\nTambién escribe las placas *o* el número de serie del vehículo.");

      }
    } else {
      SweetAlert.basic("Verifica que los datos sean correctos o que no haya campos vacios", 'warning')
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
            this.formVehicle.get('folder')?.disable();
            this.formVehicle.get('plate')?.disable();
            this.formVehicle.get('serial')?.disable();
            this.vehicleService.nextStep(this.formVehicle);
          } else {
            SweetAlert.basic("Sus datos ya están registrados\nEn unos días se pondran en contacto con usted", 'success')
          }
        },
        error: (e: HttpErrorResponse) => {
          if(e.status === 409) SweetAlert.basic("Vehiculo no encontrado\nVerifique los datos", 'warning')
           console.log(e)
        },
        
      })
    );
  }

  private validateFields(): boolean {
    const folder: string = String(this.formVehicle.get('folder')?.value).toUpperCase();
    const plate: string = String(this.formVehicle.get('plate')?.value).toUpperCase();
    const serial: string = String(this.formVehicle.get('serial')?.value).toUpperCase();

    if(folder && (plate || serial)) {
      ownerSignals.setFolder(folder);
      ownerSignals.setPlate(plate);
      ownerSignals.setSerial(serial);

      return true;
    }

    return false;
  }


  // Validar la carpeta de investigación
  // private validateFolderFn(folder: string) {
  //   this.subs.add(
  //     this.vehicleApi.validateFolder(folder)
  //     .pipe(finalize(() => this.showLoader = false))
  //     .subscribe({
  //       next: (resp: boolean) => {
  //         if(resp) {
  //           this.validateFolder = true;
  //           this.formVehicle.get('folder')?.disable();
  //         } else {
  //           SweetAlert.basic("Carpeta de investigación no encontrada", 'error')
  //         }
  //       },
  //       error: (e: HttpErrorResponse) => {
  //          console.log(e)
  //       },
        
  //     })
  //   );
  // }

  // Validar las placas
  // private validatePlateFn(plate: string) {
  //   this.subs.add(
  //     this.vehicleApi.validatePlate(plate)
  //     .pipe(finalize(() => this.showLoader = false)).subscribe({
  //       next: (resp: boolean) => {
  //         if(!resp) {
  //           ownerSignals.setPlate(plate);
  //           this.vehicleService.nextStep(this.formVehicle);
  //         } else {
  //           SweetAlert.basic("Placas del vehículo no encontradas", 'error')
  //         }
  //       },
  //       error: (e: HttpErrorResponse) => {
  //         if(e.status === 409) SweetAlert.basic("Los datos ya se han registrado\nEn unos días se pondran en contacto con usted", 'warning');
  //         else if(e.status === 500) SweetAlert.basic("Error en el servidor", 'error');
  //         else SweetAlert.basic(`Error: ${e.status}, Estado: ${e.ok}`);
  //       }
  //     })
  //   );
  // }

  // Validar el No. Serie
  // private validateSerialFn(serial: string) {
  //   this.subs.add(
  //     this.vehicleApi.validateSerial(serial)
  //     .pipe(finalize(() => this.showLoader = false)).subscribe({
  //       next: (resp: boolean) => {
  //         if(!resp) {
  //           ownerSignals.setSerial(serial);
  //           this.vehicleService.nextStep(this.formVehicle);
  //         } else {
  //           SweetAlert.basic("El número de serie no encontrado", 'error')
  //         }
  //       },
  //       error: (e: HttpErrorResponse) => {
  //         if(e.status === 409) SweetAlert.basic("Los datos ya se han registrado\nEn unos días se pondran en contacto con usted", 'warning');
  //         else if(e.status === 500) SweetAlert.basic("Error en el servidor", 'error');
  //         else SweetAlert.basic(`Error: ${e.status}, Estado: ${e.ok}`);
  //       }
  //     })
  //   );
  // }

  /* METODOS EN EL DOM */
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
