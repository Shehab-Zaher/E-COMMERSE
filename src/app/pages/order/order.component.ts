import { Component } from '@angular/core';
import { OrderService } from '../../shared/services/order/order.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Order } from '../../shared/interfaces/order';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  userId!:string

  allOrders!: Order[]

  constructor(private _orderService:OrderService, private _auth:AuthService) {
    this._auth.userData.subscribe(()=>{
      this.userId = this._auth.userData.getValue().id;
      
    })
  }

  ngOnInit(){
    this.getAllOrders(this.userId)
  }

  getAllOrders(userId:string){
    this._orderService.getOrders(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.allOrders = res
      }
    })
  }
}
