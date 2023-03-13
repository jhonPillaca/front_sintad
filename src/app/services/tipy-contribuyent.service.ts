import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoContribuyente } from '../models/TypeContribuyent';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TipyContribuyentService extends GenericService<TipoContribuyente> {

  private tipoContribuyent = new Subject<TipoContribuyente[]>();
  private messageChange = new Subject<string>();

  constructor(protected override http:HttpClient) {
    super(http,`${environment.host}/api/sintad/tipo_contribuyent`)
   }

   setMessageChange(message:string){
    this.messageChange.next(message);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  setTipoContribuyentChange(tipoContribuyent:TipoContribuyente[]){
    this.tipoContribuyent.next(tipoContribuyent);
  }

  getTipoContribuyentChange(){
    return this.tipoContribuyent.asObservable();
  }
}

