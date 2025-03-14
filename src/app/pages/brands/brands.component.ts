import { Component } from '@angular/core';
import { BrandService } from '../../shared/services/brand/brand.service';
import { Brand } from '../../shared/interfaces/brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

  brandInfo: Brand[] = []

  constructor(private _brandService:BrandService){}
  
    ngOnInit(){
      this.getBrandnfo()
    }
  
    getBrandnfo(){
      this._brandService.getBrandInfo().subscribe({
        next: (res) => {
          console.log(res);
          this.brandInfo = res.data
        },error: (err) => {
          console.log(err);
          
        }
      })
    }
}
