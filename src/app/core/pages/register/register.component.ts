import { NgClass } from '@angular/common';
import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  apiErrorMessage:string=''
  callingAPI:boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.confirmRepassword)

  router = inject(Router)  

  constructor(private _authService:AuthService){ }

  register(){
    console.log(this.registerForm.value);
    
    if(this.registerForm.valid){
      this.apiErrorMessage = ''
      this.callingAPI = true;
      this._authService.signUp(this.registerForm.value).subscribe({
        next:(res) =>{
          console.log(res);
          this.callingAPI = false;
          this.router.navigate(['/login'])
        },
        error:(err) =>{
          console.log(err);
          this.callingAPI = false;
          this.apiErrorMessage = err.error.message
        }
      })
    }else{
      this.registerForm.markAllAsTouched
    }
  }

  retriveControl(name:string){
    return this.registerForm.get(name)
  }

  confirmRepassword(pass:any){
    if(pass.get('password').value === pass.get('rePassword').value){
      return null;
    }else{
      return{'misMatch':true}
    }
  }
  
}
