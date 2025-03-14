import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  let platForm = inject(PLATFORM_ID)
  let router = inject(Router)

  if(isPlatformBrowser(platForm)){
    if(localStorage.getItem("token")){
      return true
    }else{
      router.navigate(['/login'])
      return false
    }
  }else{
    return false
  }
  
};
