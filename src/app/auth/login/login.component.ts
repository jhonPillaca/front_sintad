import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   formLogin:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private loginService :LoginService,
    private snackBar:MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createFormLogin();
  }

  createFormLogin(){
    this.formLogin = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }


  login(){
    this.formLogin.invalid;
    this.formLogin.markAllAsTouched();
    this.snackBar.open("Todos los campos son requeridos",'INFO',{duration:3000});
    return;

    const user = this.formLogin.controls['username'].value;
    const pass = this.formLogin.controls['password'].value;

    this.loginService.login(user,pass).subscribe(data =>{
      sessionStorage.setItem(environment.token_name,data.access_token);
      this.router.navigate(['pages/dashboard']);
    })
  }


  validForm(input:string){
    return this.formLogin.controls[input].errors &&
     this.formLogin.controls[input].touched;
  }

}
