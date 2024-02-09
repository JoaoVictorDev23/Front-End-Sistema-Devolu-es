import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


export interface PeriodicElement {
  filial: string;
  serie: string;
  cte: string;
  numeronfd: number;
  ValorVenda: number;
  acoes: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {numeronfd: 1, filial: 'Hydrogen',serie:'22',cte:'123', ValorVenda: 1.0079, acoes: 'H'},
  {numeronfd: 2, filial: 'Helium',serie:'22',cte:'123', ValorVenda: 4.0026, acoes: 'He'},
  {numeronfd: 3, filial: 'Lithium',serie:'22',cte:'123', ValorVenda: 6.941, acoes: 'Li'},
  {numeronfd: 4, filial: 'Beryllium',serie:'22',cte:'123', ValorVenda: 9.0122, acoes: 'Be'},
  {numeronfd: 5, filial: 'Boron', serie:'22',cte:'123',ValorVenda: 10.811, acoes: 'B'},
  {numeronfd: 6, filial: 'Carbon',serie:'22',cte:'123', ValorVenda: 12.0107, acoes: 'C'},
  {numeronfd: 7, filial: 'Nitrogen',serie:'22',cte:'123', ValorVenda: 14.0067, acoes: 'N'},
  {numeronfd: 8, filial: 'Oxygen', serie:'22',cte:'123',ValorVenda: 15.9994, acoes: 'O'},
  {numeronfd: 9, filial: 'Fluorine',serie:'22',cte:'123', ValorVenda: 18.9984, acoes: 'F'},
  {numeronfd: 10,filial: 'Neon', serie:'22',cte:'123',ValorVenda: 20.1797, acoes: 'Ne'},
];
@Component({
  selector: 'app-devolucoes-list',
  templateUrl: './devolucoes-list.component.html',
  styleUrls: ['./devolucoes-list.component.scss'],


})
export class DevolucoesListComponent {

  displayedColumns: string[] = ['numeronfd', 'filial','serie','cte', 'ValorVenda', 'acoes'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
