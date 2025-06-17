import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as ownerSignal from '@core/state/owner-data.signal';
import * as instroductionSignal from '@core/state/introduction.signal';
import { SesonStorage } from '@shared/utilities/session-storage';

@Component({
  selector: 'app-introduction',
  imports: [
    CommonModule
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {

  onClick(): void {
    SesonStorage.setItem(SesonStorage.INTRODUCTION, true);
    instroductionSignal.setActivateTransitionsIntro(true);

    setTimeout(() => instroductionSignal.setActivateTransitionsForms(true), 360);
    setTimeout(() => ownerSignal.setShowFormVehicle(true), 350);
  } 

}
