import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';



export interface PeriodicElement {
  filial: string;
  serie: string;
  cte: string;
  numeronfd: number;
  situacao: string;
  acoes: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {numeronfd: 1, filial: 'Hydrogen',serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 2, filial: 'Helium',  serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 3, filial: 'Lithium', serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 4, filial:'Beryllium',serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 5, filial: 'Boron',   serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 6, filial: 'Carbon',  serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 7, filial: 'Nitrogen',serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 8, filial: 'Oxygen',  serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 9, filial: 'Fluorine',serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
  {numeronfd: 10,filial: 'Neon',    serie:'22',cte:'123', situacao: 'Correção', acoes: ''},
];

@Component({
  selector: 'app-correcao',
  templateUrl: './correcao.component.html',
  styleUrls: ['./correcao.component.scss']
})
export class CorrecaoComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

displayedColumns: string[] = ['numeronfd', 'filial','serie','cte', 'situacao', 'acoes'];
dataSource = new MatTableDataSource(ELEMENT_DATA);

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}

