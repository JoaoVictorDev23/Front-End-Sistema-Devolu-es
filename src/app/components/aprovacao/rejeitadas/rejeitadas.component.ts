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
  {numeronfd: 1, filial: 'Hydrogen',serie:'22',cte:'123', situacao: 'Rejeitada',  acoes: 'H'},
  {numeronfd: 2, filial: 'Helium',  serie:'22',cte:'123', situacao: 'Rejeitada',  acoes: 'He'},
  {numeronfd: 3, filial: 'Lithium', serie:'22',cte:'123', situacao: 'Rejeitada',   acoes: 'Li'},
  {numeronfd: 4, filial:'Beryllium',serie:'22',cte:'123', situacao: 'Rejeitada',  acoes: 'Be'},
  {numeronfd: 5, filial: 'Boron',   serie:'22',cte:'123', situacao: 'Rejeitada',  acoes: 'B'},
  {numeronfd: 6, filial: 'Carbon',  serie:'22',cte:'123', situacao: 'Rejeitada', acoes: 'C'},
  {numeronfd: 7, filial: 'Nitrogen',serie:'22',cte:'123', situacao: 'Rejeitada', acoes: 'N'},
  {numeronfd: 8, filial: 'Oxygen',  serie:'22',cte:'123', situacao: 'Rejeitada', acoes: 'O'},

];

@Component({
  selector: 'app-rejeitadas',
  templateUrl: './rejeitadas.component.html',
  styleUrls: ['./rejeitadas.component.scss']
})
export class RejeitadasComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
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
