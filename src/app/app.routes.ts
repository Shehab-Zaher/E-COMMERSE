import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderComponent } from './pages/order/order.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { LoginComponent } from './core/pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/guard/auth.guard';
import { authGuard2 } from './shared/guard/auth.guard';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { WishlistComponent } from './pages/Wislist/wishlist/wishlist.component';
import { ForgetPassComponent } from './core/pages/forget-pass/forget-pass.component';


export const routes: Routes = [
    {path:'',redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent, canActivate:[authGuard]},
    {path:"products",component:ProductsComponent, canActivate:[authGuard]},
    {path:"cart",component:CartComponent, canActivate:[authGuard]},
    {path:"brands",component:BrandsComponent, canActivate:[authGuard]},
    {path:"wishlist",component:WishlistComponent, canActivate:[authGuard]},
    {path:"checkout/:cartId",component:CheckoutComponent, canActivate:[authGuard]},
    {path:"allorders",component:OrderComponent, canActivate:[authGuard]},
    {path:"prdouctDetails/:id",component:ProductDetailsComponent, canActivate:[authGuard]},
    {path:"register",component:RegisterComponent,canActivate:[authGuard2]},
    {path:"login",component:LoginComponent,canActivate:[authGuard2]},
    {path:"forgetpass",component:ForgetPassComponent,canActivate:[authGuard2]},


    {path:"**",component:NotFoundComponent},
];