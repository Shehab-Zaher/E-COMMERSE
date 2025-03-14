import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { httpInterceptor } from './shared/http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes,withViewTransitions()), provideClientHydration(),provideHttpClient( withFetch() , withInterceptors([httpInterceptor]) ), provideToastr(), importProvidersFrom(NgxSpinnerModule.forRoot())]
};
