import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  openAcordion : boolean = false;
  openProfile:boolean = false;
  userLogged:string;
  constructor(
              private loginService:LoginService,
              private jwtHelper:JwtHelperService
              ) { }

  ngOnInit(): void {
    const tokenData = this.jwtHelper.decodeToken(sessionStorage.getItem(environment.token_name));
    this.userLogged= tokenData.user_name;
  }


  
  toggleSidebar() {
    if (screen.width >= 992) {
      this.openAcordion = !this.openAcordion
    } 
    
    else {
      this.openAcordion=false;
    }

  }

  openCloseProfile(){
    this.openProfile = ! this.openProfile;
  }

  logout(){
    this.loginService.logout();
  }
}
