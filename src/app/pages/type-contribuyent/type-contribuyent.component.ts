import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { TipoContribuyente } from 'src/app/models/TypeContribuyent';
import { TipyContribuyentService } from 'src/app/services/tipy-contribuyent.service';
import { DialogComponent } from '../modals/dialog/dialog.component';

@Component({
  selector: 'app-type-contribuyent',
  templateUrl: './type-contribuyent.component.html',
  styleUrls: ['./type-contribuyent.component.css']
})
export class TypeContribuyentComponent implements OnInit {


  displayedColumns: string[] = ['id_tipo_contribuyente','nombre', 'estado', 'actions'];
  tipoContribuyentes: TipoContribuyente[];
  dataSource: MatTableDataSource<TipoContribuyente>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
              private typeContribuyentService:TipyContribuyentService,
              private snackBar:MatSnackBar,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.typeContribuyentService.getTipoContribuyentChange().subscribe((data) => {
      this.createTable(data);
    });

    this.typeContribuyentService.findAll().subscribe((data) => {
      this.tipoContribuyentes = data;
      this.createTable(data);
    });

    this.typeContribuyentService.getMessageChange().subscribe((data) => {
      this.snackBar.open(data, 'INFO', { duration: 3000 });
    });
  }


  createTable(data: TipoContribuyente[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event:any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  deleteById(idTipoDocumento:number){
    this.typeContribuyentService.delete(idTipoDocumento)
                .pipe(
                  switchMap( () => {
                    return this.typeContribuyentService.findAll();
                  })
                ).subscribe(data => {
                  this.typeContribuyentService.setTipoContribuyentChange(data);
                  this.typeContribuyentService.setMessageChange("Tipo de Contribuyente Eliminado");
                })
  }

  openDialog( tipoContribuyente ?: TipoContribuyente){
     this.dialog.open(DialogComponent, {
       width:'35%',
       minWidth:'300px',
       data: {
        tipoContribuyente,
        type:'contribuyente'
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
