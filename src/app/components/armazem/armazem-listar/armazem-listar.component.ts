import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

export interface PeriodicElement {
  armazem: string;
  filial: string;
  endereco: string;
  valorarmazenado: number;
  acoes: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { armazem: 'Hydrogen',filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem: 'Helium',  filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem: 'Lithium', filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem:'Beryllium',filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem: 'Boron',   filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem: 'Carbon',  filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem: 'Nitrogen',filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem: 'Oxygen',  filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem: 'Fluorine',filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
  { armazem: 'Neon',    filial:'22',endereco:'Rua 5 Qd23 Lt34, St dos Afonso, Aparecida de Goiania', valorarmazenado:1111, acoes: ''},
];

@Component({
  selector: 'app-armazem-listar',
  templateUrl: './armazem-listar.component.html',
  styleUrls: ['./armazem-listar.component.scss']
})
export class ArmazemListarComponent {
  displayedColumns: string[] = ['armazem', 'filial','endereco','valorarmazenado','acoes'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
