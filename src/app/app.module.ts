import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErroresInterceptor } from './shared/serve-error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

export function tokenGetter(){
  return sessionStorage.getItem(environment.token_name);
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    APP_ROUTES,
    PagesModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:["localhost:8081"],
        disallowedRoutes:["http://localhost:8081/login/forget"],
      }
    })

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ServerErroresInterceptor,
      multi:true
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


