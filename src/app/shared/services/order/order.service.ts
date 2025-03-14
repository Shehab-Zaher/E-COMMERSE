import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private headers = {
    token : localStorage.getItem("token") || ""
  }

  constructor(private _httpClient:HttpClient) { }

  cachePayment(cartId:string, shippingAddress:any): Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {shippingAddress},
      {headers: this.headers}
    )
  }

  getOrders(userId:string): Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }

  generateCheckout(cartId:string, shippingAddress:any): Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {shippingAddress},
      {headers: this.headers}
    )
  }
}
