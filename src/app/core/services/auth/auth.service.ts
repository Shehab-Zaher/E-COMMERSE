import { isPlatformBrowser } from '@angular/common';
import { Auth, signIn } from './../../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : BehaviorSubject<any> =  new BehaviorSubject(null)

  constructor(private _router:Router, private _httpClient: HttpClient, @Inject(PLATFORM_ID) private platForm: object) { 
    
    if(isPlatformBrowser(platForm)){
      if(localStorage.getItem("token")){
        console.log("hello from service");
        this.saveUserData()
      }
    }
    
  }

  signUp(data: Auth): Observable<any> {
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
  }

  signIn(data: signIn): Observable<any> {
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
  }

  saveUserData(){
    let data = jwtDecode(<string>JSON.stringify(localStorage.getItem("token")))
    this.userData.next(data)
  }

  signOut(){
    localStorage.removeItem("token")
    this.userData.next(null)
    this._router.navigate(['/login'])
  }

  verifyEmail(email:any): Observable<any>{
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", email)
  }

  verifyCode(code:any): Observable<any>{
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", code)
  }

  resetPassword(data:any): Observable<any>{
    return this._httpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data)
  }
}
