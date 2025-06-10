import { Component, OnInit } from '@angular/core';
import { FormUserComponent } from "../../../features/pages/form-user/form-user.component";
import { HeaderComponent } from "../../../features/components/header/header.component";
import { SweetAlert } from '@shared/utilities/sweetalert';

@Component({
  selector: 'app-shell',
  imports: [
    FormUserComponent,
    HeaderComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent implements OnInit {
  
  ngOnInit(): void {
    SweetAlert.textTitle("Texto Introductorio", 'Lorem Ipsum uiashfhiusaedbfuis<e');
  }

}
