import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/product/products.service';
import { Product } from '../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, CommonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  isCallingAPI: boolean = false

  productDetails !: Product

  productId !:string

  constructor(private _activatedRoute:ActivatedRoute, private _productsService:ProductsService, private readonly _cartService:CartService, private toastr:ToastrService){
    this._activatedRoute.params.subscribe({
      next:(res:any) => {
        this.productId = res.id
        
      }
    })
  }

  ngOnInit(){
    this.getProductDetails()
  }

  getProductDetails(){
    this._productsService.getProduct(this.productId).subscribe({
      next:(res) =>{
        console.log(res);
        this.productDetails = res.data
      }
    })
  }

  addToCart(id:string){
    if(this.isCallingAPI) return;
    this.isCallingAPI = true
    this._cartService.addProductToCart(id).subscribe({
      next:(res) => {
        console.log(res);
        this.isCallingAPI = false
        this.toastr.success('Item added successfully.');
      },error:(err) => {
        console.log(err);
        this.isCallingAPI = false
      }
    })
  }
}
