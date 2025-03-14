import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  apiErrorMessage:string=''

  cartId : string = ''

  constructor(private _activatedRoute:ActivatedRoute , private _orderService:OrderService, private _route:Router){
   this.cartId = this._activatedRoute.snapshot.params?.['cartId'];
   
  }

  shippingDetails: FormGroup = new FormGroup({
      details: new FormControl(null,[Validators.required]),
      phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city: new FormControl(null,[Validators.required]),
    })

    retriveControl(name:string){
      return this.shippingDetails.get(name)
    }

    continue(){
      console.log(this.shippingDetails.value);
      // this._orderService.cachePayment(this.cartId, this.shippingDetails.value).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     this._route.navigate(['/allorders'])
      //   }
      // })
      this._orderService.generateCheckout(this.cartId, this.shippingDetails.value).subscribe({
        next: (res) => {
          console.log(res.session.url);
          window.location.href = res.session.url
        }
      })
    }
}
