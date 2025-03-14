import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  

  constructor(private _authService:AuthService){
      _authService.userData.subscribe(res=>{
        console.log("hello from footer", res);
        
      })
      
    }
}
