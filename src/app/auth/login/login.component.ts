import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
//import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    // MatInputModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading:boolean=false;

  constructor(private authService: AuthService) {
  }

  onLogin(form:NgForm){
    if(form.invalid){
      return;
    }

    this.authService.login(form.value.email, form.value.password);

  }
}
