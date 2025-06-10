import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IComplainant } from '@shared/types/icomplainant.type';

@Injectable({
  providedIn: 'root'
})
export class OwnerInformationService {

  constructor(
    private fb: FormBuilder,
  ) { }

  public loadForm(): FormGroup {
    return this.fb.group({
      nombre: [{ value: '', disabled: true }],
      paterno: [{ value: '', disabled: true }],
      materno: [{ value: '', disabled: true }],
      curp: [{ value: '', disabled: true } ],
      telefono: [{ value: '', disabled: true }],
      celular: [{ value: '', disabled: true }],
      correoe: [{ value: '', disabled: true }],
      codigopostal: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      colonia: [{ value: '', disabled: true }],
      municipio: [{ value: '', disabled: true }],
      calle: [{ value: '', disabled: true }],
      nointerior: [{ value: '', disabled: true }],
      noexterior: [{ value: '', disabled: true }],
      ctrluinv: [{ value: '', disabled: true }],
      ctrllave: [{ value: '', disabled: true }],
      cvecalidadper: [{ value: '', disabled: true }],
    })
  }

  // Agregar los datos al formulario
  public addValuesForm(form: FormGroup, data: IComplainant): void {
    form.patchValue({
      nombre: data.nombre,
      paterno: data.paterno,
      materno: data.materno,
      curp: data.curp,
      telefono: data.telefono,
      celular: data.celular,
      correoe: data.correoe,
      codigopostal: data.codigopostal,
      estado: data.estado,
      colonia: data.colonia,
      municipio: data.municipio,
      calle: data.calle,
      nointerior: data.nointerior,
      noexterior: data.noexterior,
      ctrluinv: data.ctrluinv,
      ctrllave: data.ctrllave,
      cvecalidadper: data.cvecalidadper,
    })
  }
}
