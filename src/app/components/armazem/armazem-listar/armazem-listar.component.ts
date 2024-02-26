import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalViewArmazemComponent } from '../../modals/modal-view-armazem/modal-view-armazem.component';
import { Armazem } from 'src/app/interface/armazem-interface'; // Importe a interface Armazem

@Component({
  selector: 'app-armazem-listar',
  templateUrl: './armazem-listar.component.html',
  styleUrls: ['./armazem-listar.component.scss']
})
export class ArmazemListarComponent implements AfterViewInit {
  armazens: Armazem[] = []; // Adicione esta propriedade

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['armazem', 'filial', 'endereco',  'acoes'];
  dataSource = new MatTableDataSource<Armazem>(); // Altere o tipo de dados aqui

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public dialog: MatDialog) {
    // Popule a lista de armazéns conforme necessário
    this.armazens = [
      { nome: 'Armazém ABC',
      endereco: 'Rua XYZ, 123',
      filial: 'São Paulo',
      notasfiscais: [
        {
          filial: 1,
          serie: 100,
          cte: 12345,
          numeroNfd: 123,
          numeroNfo: 101,
          observacao: 'Nota fiscal de exemplo 1',
          valorVenda: 1500,
          valorPrejuizo: 50,
          valorArmazem: 100,
          situacao: 'Aprovada',
          comprador: { nome: 'João', cpf: 123456},
          motivo: { codigo: 'M001', descricao: 'Erro de digitação' },
          armazem: { nome: 'Armazém A', endereco: 'Rua A, 123', filial: 'Goiania' },
          motorista: { nome: 'Carlos', cpf: 'ABC123', valorDebitado: 100 },
          cliente: { nome: 'Cliente 1', cnpj: '123.456.789/0001-01', valorDebitado: 250 },
          produtos: [
            { nome: 'P001', situacao: 'Produto 1', quantidade: 2, valor: 500, armazem: 1 },
            { nome: 'P002', situacao: 'Produto 2', quantidade: 1, valor: 200, armazem: 1 }
          ]
        }
        // Adicione mais notas fiscais conforme necessário
      ] },
      { nome: 'Armazém ABCD',
      endereco: 'Rua XYZ, 123',
      filial: 'São Paulo',
      notasfiscais: [
        {
          filial: 1,
          serie: 100,
          cte: 12345,
          numeroNfd: 12444444443,
          numeroNfo: 101,
          observacao: 'Nota fiscal de exemplo 1',
          valorVenda: 1500,
          valorPrejuizo: 50,
          valorArmazem: 100,
          situacao: 'Aprovada',
          comprador: { nome: 'João', cpf: 123456},
          motivo: { codigo: 'M001', descricao: 'Erro de digitação' },
          armazem: { nome: 'Armazém A', endereco: 'Rua A, 123', filial: 'Goiania' },
          motorista: { nome: 'Carlos', cpf: 'ABC123', valorDebitado: 100 },
          cliente: { nome: 'Cliente 1', cnpj: '123.456.789/0001-01', valorDebitado: 250 },
          produtos: [
            { nome: 'P001', situacao: 'Produto 1', quantidade: 2, valor: 500, armazem: 1 },
            { nome: 'P002', situacao: 'Produto 2', quantidade: 1, valor: 200, armazem: 1 }
          ]
        },
        {
          filial: 1,
          serie: 100,
          cte: 12345,
          numeroNfd: 12444444441231231233,
          numeroNfo: 101,
          observacao: 'Nota fiscal de exemplo 1',
          valorVenda: 1500,
          valorPrejuizo: 50,
          valorArmazem: 100,
          situacao: 'Aprovada',
          comprador: { nome: 'João', cpf: 123456},
          motivo: { codigo: 'M001', descricao: 'Erro de digitação' },
          armazem: { nome: 'Armazém A', endereco: 'Rua A, 123', filial: 'Goiania' },
          motorista: { nome: 'Carlos', cpf: 'ABC123', valorDebitado: 100 },
          cliente: { nome: 'Cliente 1', cnpj: '123.456.789/0001-01', valorDebitado: 250 },
          produtos: [
            { nome: 'P005', situacao: 'Produto 5', quantidade: 5, valor: 500, armazem: 1 },
            { nome: 'P006', situacao: 'Produto 6', quantidade: 5, valor: 200, armazem: 1 }
          ]
        }
        // Adicione mais notas fiscais conforme necessário
      ] },
      // Adicione mais armazéns conforme necessário
    ];

    // Inicialize o dataSource.data com a lista de armazéns
    this.dataSource.data = this.armazens;
  }

  openDialog(armazem: Armazem) {
    const dialogRef = this.dialog.open(ModalViewArmazemComponent, {
      data: { armazem: { ...armazem } } // Usando spread operator para criar uma cópia dos dados
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
