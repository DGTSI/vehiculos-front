import { Component, effect, OnInit } from '@angular/core';
import { FormUserComponent } from "@features/pages/form-user/form-user.component";
import { HeaderComponent } from "@features/components/header/header.component";
import { FooterComponent } from "@features/components/footer/footer.component";
import { IntroductionComponent } from "@features/components/introduction/introduction.component";
import { CommonModule } from '@angular/common';

import * as ownerSignal from '@core/state/owner-data.signal';

@Component({
  selector: 'app-shell',
  imports: [
    CommonModule,
    FormUserComponent,
    HeaderComponent,
    FooterComponent,
    IntroductionComponent
],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  showFormVehicle: boolean = false;

  constructor(

  ) {
    effect(() => this.loadSignals());
  }

  private loadSignals(): void {
    this.showFormVehicle = ownerSignal.getShowFormVehicle();
  }

}
