import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerInformationComponent } from '@features/components/owner-information/owner-information.component';
import { VehicleInformationComponent } from '@features/components/vehicle-information/vehicle-information.component';

import * as ownerSignals from '@core/state/owner-data.signal';

@Component({
  selector: 'app-form-user',
  imports: [
    CommonModule,
    OwnerInformationComponent,
    VehicleInformationComponent,
],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {
  showFormUser: boolean = false;
  showFormUserAnimation: boolean = false;

  isFormSubmit: boolean = false;

  constructor(

  ) {
    effect(() => this.loadSignals());
  }

  private loadSignals(): void {
    this.showFormUser = ownerSignals.getDisableFormUser();
    this.isFormSubmit = ownerSignals.getIsFormSubmit();
    
    this.showFormUserFn()
  }

  showFormUserFn(): void {
    if(this.showFormUser) {
      setTimeout(() => {
        this.showFormUserAnimation = true
      }, 10);
    }
  }

}
