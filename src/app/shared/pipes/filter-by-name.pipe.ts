import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'filterByName',
  standalone: true
})
export class FilterByNamePipe implements PipeTransform {

  transform(products: Product[], searchKey:string): Product[] {
    return products.filter(ele => ele.title.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
