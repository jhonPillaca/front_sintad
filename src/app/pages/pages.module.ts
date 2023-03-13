import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntidadComponent } from './entidad/entidad.component';
import { TypeDocmentComponent } from './type-docment/type-docment.component';
import { TypeContribuyentComponent } from './type-contribuyent/type-contribuyent.component';
import { DialogComponent } from './modals/dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { EntiadFormComponent } from './modals/entiad-form/entiad-form.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    EntidadComponent,
    TypeDocmentComponent,
    TypeContribuyentComponent,
    DialogComponent,
    EntiadFormComponent,

    
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    DashboardComponent,

  ]
})
export class PagesModule { }
