import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import * as ownerSignals from '@core/state/owner-data.signal';

@Injectable({
  providedIn: 'root'
})
export class VehicleInformationService {

  // Caracteres no permitidos
  private forbiddenChars = ['o', 'O', 'i', 'I', '-', '_', ' '];

  constructor(
    private fb: FormBuilder,

  ) { }

  getForbiddenChars(): string[] {
    return this.forbiddenChars;
  }


  // Cargar  formularios
  public loadForm(): FormGroup {
    return this.fb.group(
      {
        plate: ['', [Validators.minLength(5), Validators.maxLength(7), this.forbiddenCharactersValidator()]],
        serial: ['', [Validators.minLength(17), Validators.maxLength(17), this.forbiddenCharactersValidator()]],
        folder: ['']
      },
      {
        validators: this.oneFieldRequired()
      }
    );
  }

  // Validacion de caracteres específicos
  private forbiddenCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (typeof value === 'string') {
        for (let char of this.forbiddenChars) {
          if (value.includes(char)) {
            return { forbiddenCharacters: true };
          }
        }
      }
      return null; // válido
    };
  }

  // Validador para un campo obligatorio
  private oneFieldRequired(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const controls = (group as any).controls;
      const hasAtLeastOneValue = Object.values(controls).some((control: any) => {
        return control.value && control.value.toString().trim() !== '';
      });

      return hasAtLeastOneValue ? null : { atLeastOneRequired: true };
    }
  }

  // Deshabilitar campos
  public disableFileds(form: FormGroup): FormGroup {
    form.get('folder')?.disable();
    form.get('plate')?.disable();
    form.get('serial')?.disable();

    return form;
  }

  // Deshabilita campos y redirije al formulario del propietario
  public nextStep(formVehicle: FormGroup): FormGroup {
    ownerSignals.setShowFormUser(true);
    formVehicle = this.disableFileds(formVehicle);

    setTimeout(() => {
      const element = document.querySelector('#owner');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 15);

    return formVehicle;
  }
}
