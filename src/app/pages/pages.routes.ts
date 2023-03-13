import { RouterModule, Routes } from "@angular/router";
import { GuardGuard } from "../guard/guard.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EntidadComponent } from "./entidad/entidad.component";
import { PagesComponent } from "./pages.component";
import { TypeContribuyentComponent } from "./type-contribuyent/type-contribuyent.component";
import { TypeDocmentComponent } from "./type-docment/type-docment.component";




const pagesRoutes:Routes =[
    {
        path:'',
        component:PagesComponent, canActivate:[GuardGuard],
        children:[
            {path:'dashboard',component:DashboardComponent},
            {path:'entidad',component:EntidadComponent},
            {path:'tipo_document',component:TypeDocmentComponent},
            {path:'tipo_contribuyent',component:TypeContribuyentComponent},
            {path:'',pathMatch:'full',redirectTo:'/dashboard'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);