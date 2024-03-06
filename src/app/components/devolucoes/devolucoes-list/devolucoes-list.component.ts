import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ModalViewArmazemComponent } from '../../modals/modal-view-armazem/modal-view-armazem.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDevolucoesViewComponent } from '../../modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';
import { ModalViewDevolucaoExcluirComponent } from '../../modals/modal-view-devolucao-excluir/modal-view-devolucao-excluir.component';
import { ModalDevolucaoEditComponent } from '../../modals/modal-devolucao-edit/modal-devolucao-edit.component';
import { NotaFiscal } from 'src/app/interface/nfd-interface';



@Component({
  selector: 'app-devolucoes-list',
  templateUrl: './devolucoes-list.component.html',
  styleUrls: ['./devolucoes-list.component.scss'],


})
export class DevolucoesListComponent implements AfterViewInit {
  notasFiscais: NotaFiscal[] = []; // Adicione esta propriedade



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

displayedColumns: string[] = ['numeronfd', 'filial','serie','cte', 'situacaonfd','situacaofinanceiro', 'acoes'];
dataSource = new MatTableDataSource();

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
constructor(public dialog: MatDialog) {

  this.notasFiscais = [
    {
      dados: {
        filial: 1,
        serie: 100,
        cte: 12345,
        situacao: 'Pendente',
        numeroNfd: 123,
        numeroNfo: 101,
        observacao: 'Nota fiscal de exemplo 1',
        motivo: { codigo: 'M001', descricao: 'Erro de digitação' },
        produtos: [
          { nome: 'P001', situacao: 'Produto 1', quantidade: 2, valor: 500, armazem: 1, numeronfd: 123 },
          { nome: 'P002', situacao: 'Produto 2', quantidade: 1, valor: 200, armazem: 1, numeronfd: 123 }
        ]
      },
      valores: {
        valorVenda: 1500,
        valorPrejuizo: 50,
        valorArmazem: 100,
        situacao: 'Aprovada',
        comprador: { nome: 'João', cpf: 1234567 },
        armazem: { nome: 'Armazém A', endereco: 'Rua A, 123', filial: 'Goiania' },
        motorista: { nome: 'Carlos', cpf: 'ABC123', valorDebitado: 100 },
        cliente: { nome: 'Cliente 1', cnpj: '123.456.789/0001-01', valorDebitado: 250 }
      }
    },
    {
      dados: {
        filial: 1,
        serie: 100,
        cte: 12345,
        situacao: "Pendente",
        numeroNfd: 123,
        numeroNfo: 101,
        observacao: "Nota fiscal de exemplo 1",
        motivo: {
          codigo: "M001",
          descricao: "Erro de digitação"
        },
        produtos: [
          {
            nome: "P001",
            situacao: "Produto 1",
            quantidade: 2,
            valor: 500,
            armazem: 1,
            numeronfd: 123
          },
          {
            nome: "P002",
            situacao: "Produto 2",
            quantidade: 1,
            valor: 200,
            armazem: 1,
            numeronfd: 123
          }
        ]
      },
      valores: {
        valorVenda: 1500,
        valorPrejuizo: 50,
        valorArmazem: 100,
        situacao: "Aprovada",
        armazem: {
          nome: "Armazém A",
          endereco: "Rua A, 123",
          filial: "Goiania"
        },
        comprador: {
          nome: "João",
          cpf: 1234567
        },
        motorista: {
          nome: "Carlos",
          cpf: "ABC123",
          valorDebitado: 100
        },
        cliente: {
          nome: "Cliente 1",
          cnpj: "123.456.789/0001-01",
          valorDebitado: 250
        }
      }

    }

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
openDialogExcluir(notaFiscal: NotaFiscal) {
  const dialogRef = this.dialog.open(ModalViewDevolucaoExcluirComponent, {data:{notaFiscal: notaFiscal}});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
openDialogAtualizar(notaFiscal: NotaFiscal) {
  const dialogRef = this.dialog.open(ModalDevolucaoEditComponent, {data:{notaFiscal: notaFiscal}});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
