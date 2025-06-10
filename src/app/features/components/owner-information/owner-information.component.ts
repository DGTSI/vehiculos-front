import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OwnerInformationService } from '@core/services/owner-information.service';
import { SweetAlert } from '@shared/utilities/sweetalert';

import * as ownerSignals from '@core/state/owner-data.signal';
import { IComplainant } from '@shared/types/icomplainant.type';
import { OwnerApiService } from '@core/api/owner-api.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-owner-information',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './owner-information.component.html',
  styleUrl: './owner-information.component.scss'
})
export class OwnerInformationComponent implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup;
  isFormSubmit: boolean = false;
  complainant: IComplainant | undefined = undefined;

  private subs: Subscription = new Subscription();
  constructor(
    private ownerInformationService: OwnerInformationService,
    private ownerApi: OwnerApiService,
  ) {
    effect(() => this.loadSignals());
  }

  ngOnInit(): void {
    this.form = this.ownerInformationService.loadForm();
  }

  ngAfterViewInit(): void {
    if(this.complainant) {
      this.validateComplainant(this.complainant.ctrluinv);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private loadSignals(): void {
    this.complainant = ownerSignals.getDataComplainant();

    if(this.complainant) {
      this.ownerInformationService.addValuesForm(this.form, this.complainant)
    }

    this.isFormSubmit = ownerSignals.getIsFormSubmit();
  }

  private validateComplainant(ctrluinv: string): void {
    this.subs.add(
      this.ownerApi.validateComplainant(ctrluinv).subscribe({
        next: (resp: boolean) => {
          if(resp) {
            setTimeout(() => {
              SweetAlert.basic('Los datos ya estan registrados\nEn unos días una persona se pondra en contacto contigo', 'success')
              const element = document.querySelector('#owner');
              element?.scrollIntoView({ behavior: 'smooth' });
            }, 15);
          } else {
            setTimeout(() => {
              SweetAlert.basic('Sus datos se han encontrado', 'success');
            }, 270);
          }
          
          ownerSignals.setIsFormSubmit(resp);
        }
      })
    );
  }

  onSubmit(): void {
    // TODO: DESHABILITAR EL BOTON UNA VEZ SE HAYAN ALMACENADO LOS DATOS (INCLUSO AL RECARGAR LA PAGIA EL BOTON DEBE DE ESTAR DESHABILITADO)
    this.subs.add(
      this.ownerApi.saveComplainant(this.form.value as IComplainant).subscribe({
        next: (resp: boolean) => {
          if(resp) {
            ownerSignals.setIsFormSubmit(true);
            setTimeout(() => {
              SweetAlert.basic('En unos días una persona se pondra en contacto contigo', 'success');
              const element = document.querySelector('#message-send-data');
              element?.scrollIntoView({ behavior: 'smooth' });
            }, 1);
          }
          
        },
        error: (e: HttpErrorResponse) => {
          if(e.status === 409) SweetAlert.basic("Sus datos ya han sido registrados", 'success');
        }
      })
    );
  }
}
