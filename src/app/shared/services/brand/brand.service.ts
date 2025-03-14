import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _httpClient:HttpClient) { }

  getBrandInfo(): Observable<any>{
      return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
}
