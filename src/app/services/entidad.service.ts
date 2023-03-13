import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entidad } from '../models/Entidad';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EntidadService extends GenericService<Entidad> {

  private entidadChange = new Subject<Entidad[]>();
  private messageChange = new Subject<string>();

  constructor(
    protected override http:HttpClient
  ) { 
    super(
      http,
      `${environment.host}/api/sintad/entidad`
    )
  }


  setMessageChange(message:string){
    this.messageChange.next(message);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  setEntidadChange(entidad:Entidad[]){
    this.entidadChange.next(entidad);
  }

  getEntidadChange(){
    return this.entidadChange.asObservable();
  }
}
