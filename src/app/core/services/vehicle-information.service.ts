import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { OwnerApiService } from '@core/api/owner-api.service';

import * as ownerSignals from '@core/state/owner-data.signal';
import { SweetAlert } from '@shared/utilities/sweetalert';

@Injectable({
  providedIn: 'root'
})
export class VehicleInformationService {

  // Caracteres no permitidos
  private forbiddenChars: string[] = [
    'o', 'O', 'i', 'I', '-', '_', ' ', 'q', 'Q', 'ñ', 'Ñ', '@', '?', '¿',
    '!', '¡', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '.', '/', 
    ':', ';', '<', '=', '>', '[', '\\', ']', '^', '`', '{', '|', '}', '~', '°', '¬'
  ];

  private forbiddenCharsFolder: string[] = [
    '_', '@', '?', '¿',
    '!', '¡', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '.', 
    ':', ';', '<', '=', '>', '[', '\\', ']', '^', '`', '{', '|', '}', '~', '°', '¬'
  ];

  constructor(
    private fb: FormBuilder,

  ) { }

  getForbiddenChars(): string[] {
    return this.forbiddenChars;
  }

  getForbiddenCharsFolder(): string[] {
    return this.forbiddenCharsFolder;
  }


  // Cargar  formularios
  public loadForm(): FormGroup {
    return this.fb.group(
      {
        folder: ['', [this.forbiddenCharactersFolderValidator()]],
        plate: ['', [Validators.minLength(5), Validators.maxLength(7), this.forbiddenCharactersValidator()]],
        serial: ['', [Validators.minLength(17), Validators.maxLength(17), this.forbiddenCharactersValidator()]],
      },
      {
        validators: this.folderAndOneOfPlateOrSerial()
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

  // Validacion de caracteres específicos
  private forbiddenCharactersFolderValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (typeof value === 'string') {
        for (let char of this.forbiddenCharsFolder) {
          if (value.includes(char)) {
            return { forbiddenCharsFolder: true };
          }
        }
      }
      return null; // válido
    };
  }

  // Validador para un campo obligatorio
  private folderAndOneOfPlateOrSerial(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const controls = (group as any).controls;
  
      const folder = controls['folder']?.value?.toString().trim();
      const plate = controls['plate']?.value?.toString().trim();
      const serial = controls['serial']?.value?.toString().trim();
  
      const folderIsValid = folder !== '';
      const plateOrSerialIsValid = plate !== '' || serial !== '';
  
      if (folderIsValid && plateOrSerialIsValid) {
        return null;
      }
  
      return { folderAndOneRequired: true };
    };
  }

  // Deshabilitar campos
  public disableFileds(form: FormGroup): FormGroup {
    form.disable();

    return form;
  }

  // Deshabilita campos y redirije al formulario del propietario
  public nextStep(formVehicle: FormGroup): FormGroup {
    ownerSignals.setDisableFormUser(false);
    ownerSignals.setDisableFormVehicle(true);
    formVehicle = this.disableFileds(formVehicle);
    SweetAlert.basic('Información del vehículo localizada\nIngrese sus datos de contacto', 'success');

    return formVehicle;
  }
}
