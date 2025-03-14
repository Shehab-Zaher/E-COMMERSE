import { CategoriesService } from './../../../../shared/services/categories/categories.service';
import { Component, inject } from '@angular/core';
import { error } from 'console';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../../shared/interfaces/category';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css'
})
export class CategoriesSliderComponent {

  categories: Category[] = []

  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      margin:10,
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 3
        },
        740: {
          items: 5
        },
        940: {
          items: 8
        }
      },
      nav: true
    }


  _categoriesService = inject(CategoriesService)

  ngOnInit(){
    this.getCategories()
  }

  getCategories(){
    this._categoriesService.getCategories().subscribe({
      next:(res) => {
        console.log(res);
        this.categories = res.data
      },error:(err) => {
        console.log(err);
        
      }
    })
  }
}
