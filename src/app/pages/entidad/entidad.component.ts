import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Entidad } from 'src/app/models/Entidad';
import { EntidadService } from 'src/app/services/entidad.service';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { EntiadFormComponent } from '../modals/entiad-form/entiad-form.component';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {


  displayedColumns: string[] = ['id_entidad', 'nro_documento', 'razon_social', 'nombre_comercial', 'estado', 'acciones'];
  entidades: Entidad[];
  dataSource: MatTableDataSource<Entidad>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  constructor(
    private entidadSerivice:EntidadService,
              private snackBar:MatSnackBar,
              private dialog:MatDialog
              ) { }



  ngOnInit(): void {

    this.entidadSerivice.getEntidadChange().subscribe(data=>{
      this.createTable(data);
    });
  }


  createTable(data:Entidad[]){

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  
  applyFilter(event:any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  deleteById(id:number){
    this.entidadSerivice.delete(id)
                .pipe(
                  switchMap( () => {
                    return this.entidadSerivice.findAll();
                  })
                ).subscribe(data => {
                  this.entidadSerivice.setEntidadChange(data);
                  this.entidadSerivice.setMessageChange("Entidad Eliminada");
                })
  }

  openDialog( entidad ?: Entidad){
     this.dialog.open(EntiadFormComponent, {
       width:'35%',
       minWidth:'300px',
       data: entidad
     })
  }

  validarEstado(estado:boolean){
    if(estado){
      return "Habilitado"
    }
    return "Deshabilitado"
  }

}
