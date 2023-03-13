import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  Menu=[
    {
      title:'Principal',
      icon:'nav-icon fas fa-tachometer-alt',
      submenu:[
        {title:'Dashboard',url:'/dashboard'},
        {title:'Entidad',url:'/entidad'},
        {title:'Tipo Documento',url:'/tipo_document'},
        {title:'Tipo Contribuyente',url:'/tipo_contribuyent'},
      ]
    }
  ]
  userLogged:string;
  constructor(
               private loginService:LoginService,
               private jwtHelper:JwtHelperService
               ) { }

  ngOnInit(): void {
    const tokenData = this.jwtHelper.decodeToken(sessionStorage.getItem(environment.token_name));
    this.userLogged= tokenData.user_name;
  }

  logout(){
    this.loginService.logout();
  }

}
