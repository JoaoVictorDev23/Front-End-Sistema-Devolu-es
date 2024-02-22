import { Motivo } from './../../../interface/motivo-interface';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService, NbStepperComponent } from '@nebular/theme';
import { ProdutosDialogComponent } from './produtos-dialog/produtos-dialog.component';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Produto } from '../../../interface/produtos.interface';
import { NgForm } from '@angular/forms';
// Importações relacionadas ao serviço removidas
import { Armazem } from 'src/app/interface/armazem-interface';
import { Motorista } from 'src/app/interface/motorista-interface';
import { Cliente } from 'src/app/interface/cliente-interface';
import { Comprador } from 'src/app/interface/comprador-interface';

@Component({
  selector: 'app-devolucoes-cadastrar',
  templateUrl: './devolucoes-cadastrar.component.html',
  styleUrls: ['./devolucoes-cadastrar.component.scss']
})
export class DevolucoesCadastrarComponent {


  notaFiscal: NotaFiscal = {
    filial: 0,
    serie: 0,
    cte: 0,
    numeroNfd: 0,
    numeroNfo:0,
    observacao: '',
    valorVenda: 0,
    valorPrejuizo: 0,
    valorArmazem: 0,

    comprador:{} as Comprador,
    motivo:{} as Motivo,
    armazem: {} as Armazem,
    motorista: {} as Motorista,
    cliente: {} as Cliente,
    produtos: [] as Produto[]
  };

  debitarValorCliente = false;
  debitarValorMotorista = false;
  linearMode = true;

  displayedColumns: string[] = ['nome', 'quantidade', 'valor', 'situacao', 'acao'];
  dataSource = new MatTableDataSource<Produto>();

  totalVenda: number = 0;
  totalPrejuizo: number = 0;
  totalArmazem: number = 0;

  constructor(private dialogService: NbDialogService) {}
  verdados(){
    console.log(this.notaFiscal);
  }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialogService.open(ProdutosDialogComponent);

    dialogRef.onClose.subscribe((produto: Produto) => {
      if (produto) {
        this.notaFiscal.produtos.push({
          'nome': produto.nome,
          'quantidade': produto.quantidade,
          'valor': produto.valor,
          'situacao': produto.situacao,
        });

        this.dataSource.data = [...this.notaFiscal.produtos];

        this.calcularValoresTotais();
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluirProduto(produto: Produto): void {
    const index = this.notaFiscal.produtos.indexOf(produto);

    if (index >= 0) {
      this.notaFiscal.produtos.splice(index, 1);
      this.dataSource.data = [...this.notaFiscal.produtos];
      this.calcularValoresTotais();
    }
  }

//calcular
calcularValoresTotais() {
  let valorVenda = 0;
  let valorPrejuizo = 0;
  let valorArmazem = 0;

  this.notaFiscal.produtos.forEach((produto: Produto) => {
    switch (produto.situacao) {
      case 'Em armazem':
        valorArmazem += produto.quantidade * produto.valor;
        break;
      case 'Venda':
        valorVenda += produto.quantidade * produto.valor;
        break;
      case 'Prejuizo':
        valorPrejuizo += produto.quantidade * produto.valor;
        break;
      default:
        break;
    }
  });

  this.notaFiscal.valorArmazem = valorArmazem;
  this.notaFiscal.valorVenda = valorVenda;
  this.notaFiscal.valorPrejuizo = valorPrejuizo;

  this.totalArmazem = valorArmazem;
  this.totalVenda = valorVenda;
  this.totalPrejuizo = valorPrejuizo;
}


  adicionarNotaFiscal(): void {
    this.notaFiscal.produtos = this.dataSource.data;

    // Aqui você pode simular o envio para o backend, por enquanto apenas imprima no console
    console.log('Nota Fiscal:', this.notaFiscal);
  }


}
