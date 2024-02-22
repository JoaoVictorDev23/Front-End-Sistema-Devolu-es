import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ModalDevolucoesViewComponent } from '../../modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';


export interface PeriodicElement {
  filial: string;
  serie: string;
  cte: string;
  numeronfd: number;
  situacao: string;
  acoes: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {numeronfd: 1, filial: 'Hydrogen',serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 2, filial: 'Helium',  serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 3, filial: 'Lithium', serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 4, filial:'Beryllium',serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 5, filial: 'Boron',   serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 6, filial: 'Carbon',  serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 7, filial: 'Nitrogen',serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 8, filial: 'Oxygen',  serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 9, filial: 'Fluorine',serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
  {numeronfd: 10,filial: 'Neon',    serie:'22',cte:'123', situacao: 'Aprovado', acoes: ''},
];

@Component({
  selector: 'app-aprovados',
  templateUrl: './aprovados.component.html',
  styleUrls: ['./aprovados.component.scss']
})
export class AprovadosComponent implements AfterViewInit{

  displayedColumns: string[] = ['numeronfd', 'filial','serie','cte', 'situacao', 'acoes'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalDevolucoesViewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
