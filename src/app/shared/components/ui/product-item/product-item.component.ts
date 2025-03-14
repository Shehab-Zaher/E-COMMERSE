import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FilterByNamePipe } from '../../../pipes/filter-by-name.pipe';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, FilterByNamePipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  constructor(private toaster:ToastrService, private _wishlistService:WishlistService){}

  wishlist:string[] = []

  @Input() isCallingAPI !: boolean

  @Input() clickedId !: string

  @Input() product !: Product

  @Output() productIdEmitter: EventEmitter<string> = new EventEmitter()
  
  addToCart(id:string){
    this.productIdEmitter.emit(id)
    this.toaster.success('Item added successfully.');
  }

  addToWishlist(id:string){
    this._wishlistService.addProductToWishlist(id).subscribe({
      next:(res) =>{
        console.log(res);
        this.wishlist = res.data
        this.toaster.success('Item added successfully to wishlist.');
      },error:(err) => {
        console.log(err);
      }
    })
  }

  removeFromWishlist(id:string){
    this._wishlistService.removeProductFromWishlist(id).subscribe({
      next:(res) =>{
        console.log(res);
        this.wishlist = res.data
        this.toaster.error('Item removed successfully from wishlist.');
      },error:(err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(){
    this.getLoggedUser()
  }

  getLoggedUser(){
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next:(res) => {
        console.log(res.data);
        const newData = res.data.map((item:any) => item._id )
        this.wishlist = newData
      },error:(err) => {
        console.log(err);
        
      }
    })
  }
}
