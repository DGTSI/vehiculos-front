import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleInformationService } from '@core/services/vehicle-information.service';
import { SmallMessageComponent } from "../../../shared/components/small-message/small-message.component";
import { SweetAlert } from '@shared/utilities/sweetalert';

import * as ownerSignals from '@core/state/owner-data.signal';
import { Subscription } from 'rxjs';
import { VehicleApiService } from '@core/api/vehicle-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IFolder } from '@shared/types/ifolder.type';
import { IComplainant } from '@shared/types/icomplainant.type';

@Component({
  selector: 'app-vehicle-information',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SmallMessageComponent
  ],
  templateUrl: './vehicle-information.component.html',
  styleUrl: './vehicle-information.component.scss'
})
export class VehicleInformationComponent implements OnInit, OnDestroy {
  
  formVehicle: FormGroup = new FormGroup({});
  forbiddenChars: string[] = [];
  isDataOwner: boolean = false;

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
    this.forbiddenChars = this.vehicleService.getForbiddenChars();
  }

  // Enviar datos al backend
  onSubmit(): void {
    // console.log(this.formVehicle.value);
    if (this.formVehicle.valid) {
      const folder: string = this.formVehicle.get('folder')?.value;
      const plate: string = this.formVehicle.get('plate')?.value;
      const serial: string = this.formVehicle.get('serial')?.value;
      
      // Validaciones
      if(folder) {
        this.validateFolder(folder);
      } else if(plate) {
        this.validatePlate(plate);
      } else if(serial) {
        this.validateSerial(serial);
      }

    } else {
      SweetAlert.basic("Verifica que los datos sean correctos o que no haya campos vacios", 'warning')
    }
  }

  // Validar la carpeta de investigación
  private validateFolder(folder: string) {
    this.subs.add(
      this.vehicleApi.validateFolder(folder).subscribe({
        next: (resp: IComplainant) => {
          if(resp) {
            ownerSignals.setDataComplainant(resp);
            this.vehicleService.nextStep(this.formVehicle);
          } else {
            SweetAlert.basic("Carpeta de investigación no encontrada", 'error')
          }
        },
        error: (e: HttpErrorResponse) => {
           console.log(e)
        }
      })
    );
  }

  // Validar las placas
  private validatePlate(plate: string) {
    this.subs.add(
      this.vehicleApi.validatePlate(plate).subscribe({
        next: (resp: IComplainant) => {
          if(resp) {
            ownerSignals.setDataComplainant(resp);
            this.vehicleService.nextStep(this.formVehicle);
          } else {
            SweetAlert.basic("Placas del vehículo no encontradas", 'error')
          }
        },
        error: (e: HttpErrorResponse) => {
          console.log(e)
        }
      })
    );
  }

  // Validar el No. Serie
  private validateSerial(serial: string) {
    this.subs.add(
      this.vehicleApi.validateSerial(serial).subscribe({
        next: (resp: IComplainant) => {
          if(resp) {
            ownerSignals.setDataComplainant(resp);
            this.vehicleService.nextStep(this.formVehicle);
          } else {
            SweetAlert.basic("El número de serie no encontrado", 'error')
          }
        },
        error: (e: HttpErrorResponse) => {
          SweetAlert.basic(`Error:\nRespuesta: ${e.ok}, Código: ${e.status}`)
        }
      })
    );
  }

  // Genera una expresión regular dinámica
  get ForbiddenRegex(): RegExp {
    const escaped = this.forbiddenChars.map(c => '\\' + c).join('');
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

}
