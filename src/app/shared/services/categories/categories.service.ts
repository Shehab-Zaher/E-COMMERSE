import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly _httpClient:HttpClient) { }

  getCategories(): Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
}
