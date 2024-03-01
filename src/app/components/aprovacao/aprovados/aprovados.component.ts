import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ModalDevolucoesViewComponent } from '../../modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';



@Component({
  selector: 'app-aprovados',
  templateUrl: './aprovados.component.html',
  styleUrls: ['./aprovados.component.scss']
})
export class AprovadosComponent implements AfterViewInit {
  notasFiscais: NotaFiscal[] = []; // Adicione esta propriedade



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

displayedColumns: string[] = ['numeronfd', 'filial','serie','cte', 'situacao','valorVenda','valorPrejuizo','valorArmazem', 'acoes'];
dataSource = new MatTableDataSource();

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
constructor(public dialog: MatDialog) {

  this.notasFiscais = [
    {     filial: 1,
      serie: 100,
      cte: 12345,
      numeroNfd: 123,
      numeroNfo: 101,
      observacao: 'Nota fiscal de exemplo 1',
      valorVenda: 1500,
      valorPrejuizo: 50,
      valorArmazem: 100,
      situacao: 'Aprovada',
      comprador: { nome: 'João', cpf: 1234567 },
      motivo: { codigo: 'M001', descricao: 'Erro de digitação' },
      armazem: { nome: 'Armazém A', endereco: 'Rua A, 123', filial:'Goiania'},
      motorista: { nome: 'Carlos', cpf: 'ABC123', valorDebitado:100 },
      cliente: { nome: 'Cliente 1', cnpj: '123.456.789/0001-01', valorDebitado:250 },
      produtos: [
        { nome: 'P001', situacao: 'Produto 1', quantidade: 2, valor: 500, armazem:1,numeronfd:123},
        { nome: 'P002', situacao: 'Produto 2', quantidade: 1, valor: 200, armazem:1,numeronfd:123}
      ]
    },
    {
      filial: 2,
      serie: 200,
      cte: 67890,
      numeroNfd: 456,
      numeroNfo: 202,
      observacao: 'Nota fiscal de exemplo 2',
      valorVenda: 2000,
      valorPrejuizo: 100,
      valorArmazem: 150,
      situacao: 'Aprovada',
      comprador: { nome: 'Maria', cpf: 7654321 },
      motivo: { codigo: 'M002', descricao: 'Produto danificado' },
      armazem: { nome: 'Armazém B', endereco: 'Rua B, 456', filial: 'São Paulo' },
      motorista: { nome: 'Ana', cpf: 'XYZ789', valorDebitado: 80 },
      cliente: { nome: 'Cliente 2', cnpj: '987.654.321/0001-02', valorDebitado: 300 },
      produtos: [
        { nome: 'P003', situacao: 'Produto 3', quantidade: 3, valor: 700 , armazem:1,numeronfd: 456},
        { nome: 'P004', situacao: 'Produto 4', quantidade: 1, valor: 400, armazem:1,numeronfd: 456 }
      ]
    },
    // Adicione mais notas fiscais conforme necessário
  ];

  // Inicialize o dataSource.data com a lista de notas fiscais
  this.dataSource.data = this.notasFiscais;
}

openDialog(notaFiscal: NotaFiscal) {
  const dialogRef = this.dialog.open(ModalDevolucoesViewComponent, {data:{notaFiscal: notaFiscal}});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
