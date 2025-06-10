import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IAlertType } from '@shared/types/itypeAlert.type';

@Component({
  selector: 'app-small-message',
  imports: [
    CommonModule
  ],
  templateUrl: './small-message.component.html',
  styleUrl: './small-message.component.scss'
})
export class SmallMessageComponent {

  @Input() message: string = "";
  @Input() type!: IAlertType;
  hiddeAlert: boolean = false;

  onClose(): void {
    this.hiddeAlert = !this.hiddeAlert
  }

}
