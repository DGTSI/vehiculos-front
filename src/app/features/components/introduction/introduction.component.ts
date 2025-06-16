import { AfterViewInit, ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as ownerSignal from '@core/state/owner-data.signal';
import * as instroductionSignal from '@core/state/introduction.signal';

@Component({
  selector: 'app-introduction',
  imports: [
    CommonModule
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent implements AfterViewInit {

  showAnimations: boolean = false;
  showForm: boolean = false;

  constructor(

  ) {
    effect(() => this.loadSignals());
  }

  ngAfterViewInit(): void {
  }

  private loadSignals(): void {
    this.showAnimations = instroductionSignal.getActivateTransitions()

    console.log(this.showAnimations);
    
  }

  onClick(): void {
    instroductionSignal.setActivateTransitions(true);

    setTimeout(() => {
      ownerSignal.setShowFormVehicle(true);
    }, 1000);
  }

}
