import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/product/products.service';
import { log } from 'util';
import { Product } from '../../../interfaces/product';
import { ProductItemComponent } from "../../ui/product-item/product-item.component";
import { CartService } from '../../../services/cart/cart.service';
import { FilterByNamePipe } from '../../../pipes/filter-by-name.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [ProductItemComponent, FilterByNamePipe, FormsModule],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.css'
})
export class RecentProductsComponent implements OnInit{

  isCallingAPI:boolean = false

  clickedId:string = ""

  searchKey: string = ''

  products: Product[] = []

  constructor(private _productsService:ProductsService, private _cartService:CartService){

  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this._productsService.getAllProducts().subscribe({
      next:(res) => {
        this.products = res.data
      },error:(err) => {
        console.log(err);
        
      }
    })
  }

  addToCart(id:string){
    console.log("hello from recent", id);
    this.isCallingAPI = true
    this.clickedId = id
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isCallingAPI = false
        this._cartService.cartNumber.set(res.numOfCartItems)
        console.log( this._cartService.cartNumber());
        
      },error: (err) => {
        console.log(err);
        this.isCallingAPI = false
      }
    })
  }
}
