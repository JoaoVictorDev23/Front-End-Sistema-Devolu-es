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

  calcularSomaProdutos(): number {
    return this.notaFiscal.dados.produtos.reduce((total, produto) => total + (produto.valor * produto.quantidade), 0);
  }



  notaFiscal: NotaFiscal = {
    dados: {
      filial: 0,
      serie: 0,
      cte: 0,
      situacao: 'Pendente',
      numeroNfd: 0,
      numeroNfo: 0,
      observacao: '',
      motivo: { codigo: '', descricao: '' },
      produtos: [] as Produto[]
    },
    valores: {
      valorVenda: 0,
      valorPrejuizo: 0,
      valorArmazem: 0,
      situacao: 'Pendente',
      comprador: { nome: '', cpf: 0 },
      armazem: { nome: '', endereco: '', filial: '' },
      motorista: { nome: '', cpf: '', valorDebitado: 0 },
      cliente: { nome: '', cnpj: '', valorDebitado: 0 }
    }
  };
  debitarValorCliente = false;
  debitarValorMotorista = true;
  linearMode = false;

  displayedColumns: string[] = ['nome', 'quantidade', 'valor', 'situacao', 'acao'];
  dataSource = new MatTableDataSource<Produto>();



  constructor(private dialogService: NbDialogService) {}
  verdados(){
    console.log(this.notaFiscal);
  }

  ngOnInit() {
    this.calcularSomaProdutos();
  }

  openDialog(): void {
    const dialogRef = this.dialogService.open(ProdutosDialogComponent);

    dialogRef.onClose.subscribe((produto: Produto) => {
      if (produto) {
        this.notaFiscal.dados.produtos.push({
          'nome': produto.nome,
          'quantidade': produto.quantidade,
          'valor': produto.valor,
          'situacao': produto.situacao,
          'armazem':produto.armazem,
          'numeronfd':produto.numeronfd
        });

        this.dataSource.data = [...this.notaFiscal.dados.produtos];

      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluirProduto(produto: Produto): void {
    const index = this.notaFiscal.dados.produtos.indexOf(produto);

    if (index >= 0) {
      this.notaFiscal.dados.produtos.splice(index, 1);
      this.dataSource.data = [...this.notaFiscal.dados.produtos];
    }
  }



  adicionarNotaFiscal(): void {
    this.notaFiscal.dados.produtos = this.dataSource.data;

    // Aqui você pode simular o envio para o backend, por enquanto apenas imprima no console
    console.log('Nota Fiscal:', this.notaFiscal);
  }


}
