import { Component } from '@angular/core';
import { RecentProductsComponent } from "../../shared/components/business/recent-products/recent-products.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RecentProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
