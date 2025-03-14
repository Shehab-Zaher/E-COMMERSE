import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartNumber:WritableSignal<number> = signal(0)

  constructor(private _httpClient:HttpClient) { }

  addProductToCart(productId:string): Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {productId},
    )
  }

  getCartInfo(): Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  deleteSpecificItem(id:string): Observable<any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  updateProductQuantity(id:string, count:string): Observable<any>{
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {count:count})
  }

  clearAll(): Observable<any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

}
