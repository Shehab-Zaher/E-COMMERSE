import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard2: CanActivateFn = (route, state) => {
  
  let platForm = inject(PLATFORM_ID)
    let router = inject(Router)
  
    if(isPlatformBrowser(platForm)){
      if(localStorage.getItem("token")){
        router.navigate(['/home'])
        return false
      }else{
        return true
      }
    }else{
      return false
    }
};
