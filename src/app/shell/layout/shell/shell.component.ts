import { Component } from '@angular/core';
import { NavigationComponent } from "../../../features/components/navigation/navigation.component";
import { FormUserComponent } from "../../../features/pages/form-user/form-user.component";

@Component({
  selector: 'app-shell',
  imports: [NavigationComponent, FormUserComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

}
