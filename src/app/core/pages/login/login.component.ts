import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  apiErrorMessage:string=''
  callingAPI:boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
  })

  router = inject(Router)  

  constructor(private _authService:AuthService){ }

  signIn(){
    console.log(this.loginForm.value);
    
    if(this.loginForm.valid){
      this.apiErrorMessage = ''
      this.callingAPI = true;
      this._authService.signIn(this.loginForm.value).subscribe({
        next:(res) =>{
          console.log(res);
          localStorage.setItem("token", res.token)
          this._authService.saveUserData()
          this.callingAPI = false;
          this.router.navigate(['/home'])
        },
        error:(err) =>{
          console.log(err);
          this.callingAPI = false;
          this.apiErrorMessage = err.error.message
        }
      })
    }else{
      this.loginForm.markAllAsTouched
    }
  }

  retriveControl(name:string){
    return this.loginForm.get(name)
  }

}
