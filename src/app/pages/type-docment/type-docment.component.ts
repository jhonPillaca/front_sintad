import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { TipoDocumento } from 'src/app/models/TypeDocment';
import { TipyDocmentService } from 'src/app/services/tipy-docment.service';
import { DialogComponent } from '../modals/dialog/dialog.component';

@Component({
  selector: 'app-type-docment',
  templateUrl: './type-docment.component.html',
  styleUrls: ['./type-docment.component.css']
})
export class TypeDocmentComponent implements OnInit {


  tipDocment: TipoDocumento[];

  displayedColumns: string[] = ['id_tipo_documento', 'codigo', 'nombre', 'descripcion', 'estado', 'actions'];

  dataSource: MatTableDataSource<TipoDocumento>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  
  constructor(
             private typeDocmentService : TipyDocmentService,
             private snackBar: MatSnackBar,
             private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.typeDocmentService.getTipoDocumentChange().subscribe((data) => {
      this.createTable(data);
    });

    this.typeDocmentService.findAll().subscribe((data) => {
      this.tipDocment = data;
      this.createTable(data);
    });

    this.typeDocmentService.getMessageChange().subscribe((data) => {
      this.snackBar.open(data, 'INFO', { duration: 3000 });
    });
  }

  
  createTable(data: TipoDocumento[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event:any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  deleteById(idTipDocument:number){
    this.typeDocmentService.delete(idTipDocument)
                .pipe(
                  switchMap( () => {
                    return this.typeDocmentService.findAll();
                  })
                ).subscribe(data => {
                  this.typeDocmentService.setTipoDocumentChange(data);
                  this.typeDocmentService.setMessageChange("Documento Eliminado");
                })
  }

  openDialog( tipoDocumento ?: TipoDocumento){
     this.dialog.open(DialogComponent, {
       width:'35%',
       minWidth:'300px',
       data: {
        tipoDocumento,
        type:'documento'
      }
     })
  }

  validarEstado(estado:boolean){
    if(estado){
      return "Habilitado"
    }
    return "Deshabilitado"
  }

}

