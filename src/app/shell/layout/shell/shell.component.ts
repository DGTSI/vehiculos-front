import { Component, effect } from '@angular/core';
import { FormUserComponent } from "@features/pages/form-user/form-user.component";
import { HeaderComponent } from "@features/components/header/header.component";
import { FooterComponent } from "@features/components/footer/footer.component";
import { IntroductionComponent } from "@features/components/introduction/introduction.component";
import { CommonModule } from '@angular/common';

import * as ownerSignal from '@core/state/owner-data.signal';
import * as instroductionSignal from '@core/state/introduction.signal';
import { SesonStorage } from '@shared/utilities/session-storage';

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
  showAnimationIntro: boolean = false;
  showAnimationForms: boolean = false;
  showFormVehicle: boolean = Boolean(SesonStorage.getItem(SesonStorage.INTRODUCTION)) || false;

  constructor(

  ) {
    effect(() => this.loadSignals());
  }

  private loadSignals(): void {
    if(!this.showFormVehicle) {
      this.showAnimationIntro = instroductionSignal.getActivateTransitionsIntro();
      this.showAnimationForms = instroductionSignal.getActivateTransitionsForms();
      this.showFormVehicle = ownerSignal.getDisableFormVehicle();
    } else {
      this.showAnimationIntro = true
      this.showAnimationForms = true
    }
  }
}
