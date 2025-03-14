import { Component } from '@angular/core';
import { RecentProductsComponent } from "../../shared/components/business/recent-products/recent-products.component";
import { CategoriesSliderComponent } from "./components/categories-slider/categories-slider.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecentProductsComponent, CategoriesSliderComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
