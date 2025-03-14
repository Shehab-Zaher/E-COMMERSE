import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FilterByNamePipe } from '../../../shared/pipes/filter-by-name.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  wishlist:string[] = []

  products: Product[] = []

  constructor(private _wishlistService:WishlistService, private toaster:ToastrService){}

  ngOnInit(){
    this.getLoggedUser()
  }

  getLoggedUser(){
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next:(res) => {
        console.log(res.data);
        this.products = res.data
        const newData = res.data.map((item:any) => item._id )
        this.wishlist = newData
      },error:(err) => {
        console.log(err);
        
      }
    })
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
        const newProductsData = this.products.filter((item:any) => this.wishlist.includes(item._id))
        this.products = newProductsData
        this.toaster.error('Item removed successfully from wishlist.');
      },error:(err) => {
        console.log(err);
      }
    })
  }
}
