import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OwnerInformationService } from '@core/services/owner-information.service';
import { SweetAlert } from '@shared/utilities/sweetalert';
import { IComplainant } from '@shared/types/icomplainant.type';
import { OwnerApiService } from '@core/api/owner-api.service';
import { finalize, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IFolder } from '@shared/types/ifolder.type';

import * as ownerSignals from '@core/state/owner-data.signal';
import { BtnLoaderComponent } from '@shared/components/btn-loader/btn-loader.component';


@Component({
  selector: 'app-owner-information',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BtnLoaderComponent,
  ],
  templateUrl: './owner-information.component.html',
  styleUrl: './owner-information.component.scss'
})
export class OwnerInformationComponent implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup;
  contact: IComplainant | undefined = undefined;
  showLoader: boolean = false;
  disableForm: boolean = true;

  private subs: Subscription = new Subscription();
  constructor(
    private ownerInformationService: OwnerInformationService,
    private ownerApi: OwnerApiService,
  ) {
    effect(() => this.loadSignals());
  }

  ngOnInit(): void {
    this.form = this.ownerInformationService.loadForm();
    this.form.disable();
  }

  ngAfterViewInit(): void {
    if(this.contact) {
      this.validateContact(this.contact.ctrluinv);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private loadSignals(): void {
    this.contact = ownerSignals.getDataComplainant();
    this.disableForm = ownerSignals.getDisableFormUser();
    
    this.disableForm ? this.form.disable() : this.form.enable();
  }

  private validateContact(ctrluinv: string): void {
    this.subs.add(
      this.ownerApi.validateContact(ctrluinv).subscribe({
        next: (resp: boolean) => {
          if(resp) {
            setTimeout(() => {
              SweetAlert.basic('Los datos ya estan registrados\nEn unos días una persona se pondra en contacto con usted', 'success')
            }, 350);
            setTimeout(() => {
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

  // Enviar datos al boton
  onChange(): void {
    const formValid: boolean = this.form.valid;

    if(formValid) {
      ownerSignals.setFormContact(this.form);
    }
  }

  // Click al boton
  onSubmit(): void {
    this.showLoader = true;

    if(this.form.valid) {
      const folder: IFolder = ownerSignals.getFormVehiclel().value as IFolder;
      const contact: IComplainant = this.form.value as IComplainant;

      this.sendData(folder, contact);
    } else {
      this.showLoader = false;
      SweetAlert.basic('Algunos datos no son válidos\nVerifique nuevamente', 'warning');
    }
  }

  // Enviar datos al backend
  private sendData(folder: IFolder, contact: IComplainant): void {
    this.subs.add(
      this.ownerApi.saveComplainant(contact, folder)
      .pipe(finalize(() => this.showLoader = false))
      .subscribe({
        next: (resp: boolean) => {
          if(resp) {
            this.form.disable();
            setTimeout(() => {
              SweetAlert.basic('En unos días una persona se pondra en contacto contigo', 'success');
              const element = document.querySelector('#message-send-data');
              element?.scrollIntoView({ behavior: 'smooth' });
            }, 1);
          }
          
        },
        error: (e: HttpErrorResponse) => {
          if(e.status === 400) SweetAlert.basic("Algunos datos no son válidos\nVerifique nuevamente", 'warning');
          if(e.status === 409) SweetAlert.basic("Sus datos ya han sido registrados\nEn unos días se pondran en contacto con usted", 'success');
          if(e.status === 422) SweetAlert.basic("Algunos datos no son válidos\nVerifique nuevamente", 'warning');
          if(e.status === 500) SweetAlert.basic(`ERROR\n Estatus: ${e.status}, Respuesta: ${e.ok}`, 'error');
        }
      })
    );
  }
}
