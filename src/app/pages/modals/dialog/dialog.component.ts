import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { Entidad } from 'src/app/models/Entidad';
import { TipoContribuyente } from 'src/app/models/TypeContribuyent';
import { TipoDocumento } from 'src/app/models/TypeDocment';
import { EntidadService } from 'src/app/services/entidad.service';
import { TipyContribuyentService } from 'src/app/services/tipy-contribuyent.service';
import { TipyDocmentService } from 'src/app/services/tipy-docment.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  tipoRegister: string;
  formDialog: FormGroup;
  typeDocment: TipoDocumento;
  typeContribuyent: TipoContribuyente;
  dataForm:any;
  tipDocment:boolean=false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Entidad,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    private entidadService : EntidadService,
    private snackBar: MatSnackBar,
    private typeDocumentService: TipyDocmentService,
    private typeContribuyentService: TipyContribuyentService
  ) { }

  ngOnInit(): void {

    this.dataForm = { ...this.data }
    this.tipoRegister = this.dataForm.type;
    this.tipoRegister=='documento' ?this.tipDocment=true :this.tipDocment = false;


    
    this.selectForm();
  }


  createForm() {
    this.formDialog = this.formBuilder.group({
      codigo: this.tipoRegister == 'contribuyente' ? [''] : ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: this.tipoRegister == 'contribuyente' ? [''] : ['', Validators.required],
      estado: [true, Validators.required]
    })
  }

  createFormEdition() {
    this.formDialog = this.formBuilder.group({
      codigo: this.tipoRegister == 'contribuyente' ? [''] : [this.typeDocment.codigo, Validators.required],
      nombre: this.tipoRegister == 'contribuyente' ? [this.typeContribuyent.nombre, Validators.required] : [this.typeDocment.nombre, Validators.required],
      descripcion: this.tipoRegister == 'contribuyente' ? [''] : [this.typeDocment.descripcion, Validators.required],
      estado: this.tipoRegister == 'contribuyente' ? [this.typeContribuyent.estado, Validators.required] : [this.typeDocment.estado, Validators.required]
    })
  }

  selectForm() {

    if (this.typeDocment == undefined || this.typeContribuyent == undefined) {
      this.createForm();
      return;
    }

    this.createFormEdition();
  }

  validarPorCampo(campo: string) {
    return this.formDialog.controls[campo].errors
      && this.formDialog.controls[campo].touched;
  }

  closeDialogo() {
    this.dialogRef.close();
  }

  saveAny() {


    if (this.formDialog.invalid) {
      this.snackBar.open("Completar campos", 'INFO', { duration: 3000 });
      this.formDialog.markAllAsTouched();
      return;
    }

    if(this.tipoRegister=='contribuyente'){
      this.saveTipContribuyent()
    }else{
      this.saveTipDocment();
    }
   
  }

  saveTipContribuyent(){
    const tipoContribuyente: TipoContribuyente = {
      id_tipo_contribuyente: this.typeContribuyent == undefined ? null : this.typeContribuyent.id_tipo_contribuyente,
      nombre: this.formDialog.controls['nombre'].value.toUpperCase(),
      estado: this.formDialog.controls['estado'].value
    }


    if(this.typeContribuyent == undefined){
      this.typeContribuyentService.save(tipoContribuyente).pipe(
        switchMap(() => {
          return this.typeContribuyentService.findAll();
        })
      ).subscribe(data => {
        this.typeContribuyentService.setTipoContribuyentChange(data);
        this.typeContribuyentService.setMessageChange("Contribuyente agregado correctamente");
        this.closeDialogo();
      })
    }
    else{
      this.typeContribuyentService.edit(tipoContribuyente).pipe(
        switchMap(() => {
          return this.typeContribuyentService.findAll();
        })
      ).subscribe(data => {
        this.typeContribuyentService.setTipoContribuyentChange(data);
        this.typeContribuyentService.setMessageChange("Contribuyente actualizado correctamente");
        this.closeDialogo();
      })
    }
  }

  saveTipDocment(){
    const tipoDocumento: TipoDocumento = {
      id_tipo_documento: this.typeDocment == undefined ? null : this.typeDocment.id_tipo_documento,
      codigo: this.formDialog.controls['codigo'].value,
      nombre: this.formDialog.controls['nombre'].value.toUpperCase(),
      descripcion: this.formDialog.controls['descripcion'].value.toUpperCase(),
      estado: this.formDialog.controls['estado'].value
    }


    if(this.typeDocment == undefined){
      this.typeDocumentService.save(tipoDocumento).pipe(
        switchMap(() => {
          return this.typeDocumentService.findAll();
        })
      ).subscribe(data => {
        this.typeDocumentService.setTipoDocumentChange(data);
        this.typeDocumentService.setMessageChange("Documento agregado correctamente");
        this.closeDialogo();
      })
    }
    else{
      this.typeDocumentService.edit(tipoDocumento).pipe(
        switchMap(() => {
          return this.typeDocumentService.findAll();
        })
      ).subscribe(data => {
        this.typeDocumentService.setTipoDocumentChange(data);
        this.typeDocumentService.setMessageChange("Documento actualizado correctamente");
        this.closeDialogo();
      })
    }
  }

  asignarTitulo() {
    return this.tipoRegister == 'contribuyente'
      ? this.typeContribuyent == undefined
        ? "Agregar Tipo Contribuyente"
        : "Editar Tipo Contribuyente"
      : this.typeDocment == undefined
        ? "Agregar Tipo Documento"
        : "Editar Tipo Documento";
  }


}
