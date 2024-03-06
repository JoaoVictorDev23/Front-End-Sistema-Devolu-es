import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { ModalViewDevolucaoCorrecaoGestorComponent } from '../../modals/modal-view-devolucao-correcao-gestor/modal-view-devolucao-correcao-gestor.component';


@Component({
  selector: 'app-aprovacao',
  templateUrl: './aprovacao.component.html',
  styleUrls: ['./aprovacao.component.scss']
})
export class AprovacaoComponent implements AfterViewInit {
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
  this.dataSource.data = this.notasFiscais.filter(notaFiscal => notaFiscal.dados.situacao === 'Pendente' || notaFiscal.valores.situacao === 'Pendente');}

aprovar(notaFiscal: NotaFiscal) {
  const dialogRef = this.dialog.open(ModalViewDevolucaoCorrecaoGestorComponent, {data:{notaFiscal: notaFiscal}});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
