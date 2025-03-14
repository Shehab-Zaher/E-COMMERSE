import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-pass',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css'
})
export class ForgetPassComponent {

  constructor(private _authService:AuthService, private _toastrService:ToastrService, private _router:Router){}
  statusMsg!:string
  steps:number = 1;
  apiErrorMessage:string=''
  callingAPI:boolean = false;

  resetPass: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
  })

  resetSubmit(form:FormGroup){
    this._authService.resetPassword(form.value).subscribe({
      next:(res) => {
        localStorage.setItem("token", res.token)
        this._authService.saveUserData()
        this._router.navigate(['/home'])
      }
    })
  }


  VerifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
  })

  emailSubmit(form:FormGroup){
    this._authService.verifyEmail(form.value).subscribe({
      next:(res) => {
        console.log(res);
        if(res.statusMsg == 'success'){
          this._toastrService.success(res.message)
          this.steps=2
        }
      }
    })
  }

  VerifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)]),
  })

  CodeSubmit(form:FormGroup){
    this._authService.verifyCode(form.value).subscribe({
      next:(res) => {
        console.log(res);
        if(res.status == 'Success'){
          this._toastrService.success("Done")
          this.steps=3
        }
      }
    })
  }


  retriveControl(name:string){
    return this.resetPass.get(name)
  }

  
}
