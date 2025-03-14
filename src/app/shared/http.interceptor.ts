import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);
  
  // let toaster = inject(ToastrService)
  // toaster.success("hello")

  let spinner = inject(NgxSpinnerService)


  req = req.clone({
    setHeaders : {token: localStorage.getItem("token") || ""}
  })

  spinner.show()

  return next(req).pipe(finalize(()=>{
    spinner.hide()
  }))
  
  // return next(req).pipe(catchError((err:any)=>{

  //   toaster.error(err.error.message)

  //   return throwError(err)
  // }))
};
