import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../models/TypeDocment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TipyDocmentService extends GenericService<TipoDocumento> {


  
  private tipoDocument= new Subject<TipoDocumento[]>();
  private messageChange = new Subject<string>();
  
  constructor(protected override http: HttpClient) {
    super(http,`${environment.host}/api/sintad/tipo_docment`)
   }

   setMessageChange(message:string){
    this.messageChange.next(message);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  setTipoDocumentChange(TypeDocment:TipoDocumento[]){
    this.tipoDocument.next(TypeDocment);
  }

  getTipoDocumentChange(){
    return this.tipoDocument.asObservable();
  }
}
