import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  // {path:'',component:PagesComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},

  {path:'**',component:NopagefoundComponent}
];


export const APP_ROUTES = RouterModule.forRoot(routes);
