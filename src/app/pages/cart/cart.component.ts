import { Component } from '@angular/core';
import { CartService } from '../../shared/services/cart/cart.service';
import { Cart } from '../../shared/interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartInfo : Cart = {} as Cart

  constructor(private _cartService:CartService, private toaster:ToastrService){}

  ngOnInit(){
    this.getcartInfo()
  }

  getcartInfo(){
    this._cartService.getCartInfo().subscribe({
      next: (res) => {
        console.log(res);
        this.cartInfo = res
      },error: (err) => {
        console.log(err);
        
      }
    })
  }

  removeItem(id:string){
    this._cartService.deleteSpecificItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartInfo = res
        this._cartService.cartNumber.set(res.numOfCartItems)
        this.toaster.error('Item removed successfully.');
      },error: (err) => {
        console.log(err);
        
      }
    })
  }

  updateProduct(id:string , count:number){
    console.log(id , count);
    this._cartService.updateProductQuantity(id , `${count}`).subscribe({
      next:(res) => {
        console.log(res);
        this.cartInfo = res
      },error:(err) => {
        console.log(err);
        
      }
    })
  }

  clearAll(){
    this._cartService.clearAll().subscribe({
      next:(res) => {
        console.log(res);
        this._cartService.cartNumber.set(0)
        this.toaster.error('All items removed successfully.');
      },error: (err) => {
        console.log(err);
        
      }
    })
  }

  checkOut(){
    
  }

}
