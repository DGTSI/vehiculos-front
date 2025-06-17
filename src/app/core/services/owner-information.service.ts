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
      nombre: ['', Validators.required],
      paterno: ['', Validators.required ],
      materno: ['' ],
      curp: ['', Validators.required  ],
      telefono: ['', Validators.required ],
      celular: [''],
      correoe: ['', [Validators.required, Validators.email] ],
      codigopostal: ['', Validators.required ],
      estado: ['', Validators.required ],
      colonia: ['', Validators.required ],
      municipio: ['', Validators.required ],
      calle: ['', Validators.required ],
      nointerior: [''],
      noexterior: ['', Validators.required ],
      ctrluinv: [''],
      ctrllave: [''],
      cvecalidadper: [''],
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
