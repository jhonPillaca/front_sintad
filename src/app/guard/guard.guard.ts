import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private loginService:LoginService,
              private jwtHelp:JwtHelperService
              ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
      let loggin:boolean = this.loginService.isLogged()

      if(!loggin){
        this.loginService.logout()
        return false;
      }

      let token = sessionStorage.getItem(environment.token_name);
      if(this.jwtHelp.isTokenExpired(token)){
        this.loginService.logout()
        return false;
      }
  
    return true;
  }
  
}
