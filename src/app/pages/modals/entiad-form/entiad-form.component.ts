import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap } from 'rxjs';
import { Entidad } from 'src/app/models/Entidad';
import { TipoContribuyente } from 'src/app/models/TypeContribuyent';
import { TipoDocumento } from 'src/app/models/TypeDocment';
import { EntidadService } from 'src/app/services/entidad.service';
import { TipyContribuyentService } from 'src/app/services/tipy-contribuyent.service';
import { TipyDocmentService } from 'src/app/services/tipy-docment.service';

@Component({
  selector: 'app-entiad-form',
  templateUrl: './entiad-form.component.html',
  styleUrls: ['./entiad-form.component.css']
})
export class EntiadFormComponent implements OnInit {

  entidad: Entidad;
  formEntidad: FormGroup;

  typeDocment : Observable<TipoDocumento[]>;
  typeContribuyent : Observable<TipoContribuyente[]>;

  existeNroDocumento: boolean = false;

  constructor(
              @Inject(MAT_DIALOG_DATA) private data : Entidad,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EntiadFormComponent>,
              private entidadService : EntidadService,
              private snackBar: MatSnackBar,
              private typeDocmentService: TipyDocmentService,
              private typeContribuyentService: TipyContribuyentService
  ) { }

  ngOnInit(): void {

    this.entidad = this.data;
    this.getTypeDocument();
    this.getTypeContribuyent();
    this.selectForm();
  }

  createForm(){
    this.formEntidad = this.formBuilder.group({
      tipoDocumento     :['', Validators.required],
      nro_documento     :['', Validators.required],
      razon_social      :['', Validators.required],
      nombre_comercial  :['', []],
      tipoContribuyente :['', Validators.required],
      direccion         :['', Validators.required],
      telefono          :['', []],
      estado            :[true, Validators.required]
    })
  }

  
  getTypeDocument(){
    this.typeDocment = this.typeDocmentService.findAll();
  }

  getTypeContribuyent(){
    this.typeContribuyent = this.typeContribuyentService.findAll();
  }

  createFormEdition(){
    this.formEntidad = this.formBuilder.group({
      tipoDocumento     :[this.entidad.tipoDocumento.id_tipo_documento, Validators.required],
      nro_documento     :[this.entidad.nro_documento, Validators.required],
      razon_social      :[this.entidad.razon_social, Validators.required],
      nombre_comercial  :[this.entidad.nombre_comercial, []],
      tipoContribuyente :[this.entidad.tipoContribuyente.id_tipo_contribuyente, Validators.required],
      direccion         :[this.entidad.direccion, Validators.required],
      telefono          :[this.entidad.telefono, []],
      estado            :[this.entidad.estado, Validators.required]
    })
  }

  selectForm(){
    if(this.entidad == undefined){
      this.createForm();
      return;
    }

    this.createFormEdition();
  }

  validarPorCampo(campo:string){
    return this.formEntidad.controls[campo].errors 
        && this.formEntidad.controls[campo].touched;
  }

  closeDialogo(){
    this.dialogRef.close();
  }

  saveEntidad(){
    
    if(this.formEntidad.invalid){
      this.snackBar.open("Completar campos", 'INFO', { duration: 3000 });
      this.formEntidad.markAllAsTouched();
      return;
    }

    
    this.validarNumeroDocumento()
    if(this.existeNroDocumento){
      this.snackBar.open("El número de documento ya existe", 'INFO', { duration: 3000 });
      return;
    }

    
    let tipoDocumento: TipoDocumento = new TipoDocumento();
    tipoDocumento.id_tipo_documento = this.formEntidad.controls['tipoDocumento'].value

    
    let tipoContribuyente: TipoContribuyente = new TipoContribuyente();
    tipoContribuyente.id_tipo_contribuyente = this.formEntidad.controls['tipoContribuyente'].value

    
    let entidadObjeto : Entidad = new Entidad();
    entidadObjeto.id_entidad        = this.entidad == undefined ? null : this.entidad.id_entidad
    entidadObjeto.tipoDocumento     = tipoDocumento;
    entidadObjeto.nro_documento     = this.formEntidad.controls['nro_documento'].value;
    entidadObjeto.razon_social      = this.formEntidad.controls['razon_social'].value.toUpperCase();
    entidadObjeto.nombre_comercial  = this.formEntidad.controls['nombre_comercial'].value.toUpperCase();
    entidadObjeto.tipoContribuyente = tipoContribuyente;
    entidadObjeto.direccion         = this.formEntidad.controls['direccion'].value.toUpperCase();
    entidadObjeto.telefono          = this.formEntidad.controls['telefono'].value;
    entidadObjeto.estado            = this.formEntidad.controls['estado'].value;

    
    if(this.entidad == undefined){
      this.entidadService.save(entidadObjeto).pipe(
        switchMap(() => {
          return this.entidadService.findAll();
        })
      ).subscribe(data => {
        this.entidadService.setEntidadChange(data);
        this.entidadService.setMessageChange("Entidad registrada correctamente");
        this.closeDialogo();
      })
    }
    else{
      this.entidadService.edit(entidadObjeto).pipe(
        switchMap(() => {
          return this.entidadService.findAll();
        })
      ).subscribe(data => {
        this.entidadService.setEntidadChange(data);
        this.entidadService.setMessageChange("Entidad actualizada correctamente");
        this.closeDialogo();
      })
    }
  }

  validarNumeroDocumento(){

    let nro_documento = this.formEntidad.controls['nro_documento'].value


    this.entidadService.findAll().subscribe(data => {
      let arregloDocumentos = data.map(element => element.nro_documento);
      if(arregloDocumentos.includes(nro_documento)){
        this.existeNroDocumento = true;
      }else{
        this.existeNroDocumento = false;
      }
      
    })

  }

  asignarTitulo(){
    if(this.entidad == undefined){
      return "Agregar Entidad"
    }

    return "Editar Entidad"
  }


 

}
