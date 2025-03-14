import { Component, computed, inject, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { FlowbitService } from '../../services/flowbit/flowbit.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  navcountNumber:Signal<number> = computed(() => this._cartService.cartNumber())

  isLoggedIn:boolean = false

  constructor (private _authService:AuthService, private _cartService:CartService, private _flowbitService:FlowbitService){
    _authService.userData.subscribe(res=>{
      console.log("hello from Navbar", res);
      if(res){
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    })
    
  }

  logOut(){
    this._authService.signOut()
  }

  ngOnInit(){

    this._flowbitService.loadFlowbite(() =>{
      
    })

    // this._cartService.getCartInfo().subscribe({
    //   next:(res) => {
    //     console.log(res);
    //     this._cartService.cartNumber.set(res.numOfCartItems)
    //   }
    // })
    
  }
}
