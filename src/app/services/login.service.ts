import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string = `${environment.host}/auth/token`

  constructor(
    private http : HttpClient,
    private router : Router
  ) { }

  login(username: string, password: string){
    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Authorization', 'Basic ' + btoa(environment.token_auth_username + ':' + environment.token_auth_password))
    });

  }

  isLogged(){
    let token = sessionStorage.getItem(environment.token_name);
    return token != null
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
