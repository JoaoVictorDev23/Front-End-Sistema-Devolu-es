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
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';
import { Pessoa } from 'src/app/interface/pessoa-interface';

@Component({
  selector: 'app-devolucoes-cadastrar',
  templateUrl: './devolucoes-cadastrar.component.html',
  styleUrls: ['./devolucoes-cadastrar.component.scss']
})
export class DevolucoesCadastrarComponent {

  calcularSomaProdutos(): number {
    return this.notaFiscal.produtosDTO.reduce((total, produto) => total + (produto.produtoValor * produto.produtoQuantidade), 0);
  }

  clientes: Cliente[] = [];
  motoristas: Motorista[] = [];
  motivo: Motivo[] = [];
  armazens: Armazem[] = [];
  compradores: Pessoa[] = [];

  motorista: Motorista={
    nome:'',
    cpf:'',
    email:'',
    debitado:0,
  }


  notaFiscal: NotaFiscal = {
    dadosNfdDTO: {
      filial: '',
      serie: '',
      cte: '',
      situacao: 'Pendente',
      numeroNfd: '',
      numeroNfo: '',
      observacao: '',
      motivo: 0
    },
    valoresDTO: {
      valorVenda: 0,
      valorPrejuizo: 0,
      valorArmazem: 0,
      situacaoValores: 'Pendente',
      pessoa:'0',
      armazem:0 ,
      motorista: '0',
      cliente:'0' ,
      numeronfd:''
    },
    produtosDTO:[
      {
        produtoNome: '',
        produtoQuantidade: 0,
        produtoValor: 0,
        situacaoProduto: '',
        armazemId: 0,
        numeronfd: ''
      }
    ]

  };
  debitarValorCliente = false;
  debitarValorMotorista = true;
  linearMode = false;

  displayedColumns: string[] = ['nome', 'quantidade', 'valor', 'situacao', 'acao'];
  dataSource = new MatTableDataSource<Produto>();



  constructor(private dialogService: NbDialogService,private nfdService: NfdserviceService) {}
  verdados(){
    console.log(this.notaFiscal);
  }

  ngOnInit() {
    this.calcularSomaProdutos();
    this.getClientes();
    this.getMotoristas();
    this.getArmazens();
    this.getCompradores();
  }

  openDialog(): void {
    const dialogRef = this.dialogService.open(ProdutosDialogComponent);

    dialogRef.onClose.subscribe((produto: Produto) => {
      if (produto) {
        this.notaFiscal.produtosDTO.push({
          'produtoNome': produto.produtoNome,
          'produtoQuantidade': produto.produtoQuantidade,
          'produtoValor': produto.produtoValor,
          'situacaoProduto': produto.situacaoProduto,
          'armazemId':produto.armazemId,
          'numeronfd':this.notaFiscal.dadosNfdDTO.numeroNfd
        });

        this.dataSource.data = [...this.notaFiscal.produtosDTO];

      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluirProduto(produto: Produto): void {
    const index = this.notaFiscal.produtosDTO.indexOf(produto);

    if (index >= 0) {
      this.notaFiscal.produtosDTO.splice(index, 1);
      this.dataSource.data = [...this.notaFiscal.produtosDTO];
    }
  }

  getClientes(): void {
    this.nfdService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  getMotoristas(): void {
    this.nfdService.getMotoristas().subscribe(motoristas => {
      this.motoristas = motoristas;
    });
  }

  getArmazens(): void {
    this.nfdService.getArmazens().subscribe(armazens => {
      this.armazens = armazens;
    });
  }

  getCompradores(): void {
    this.nfdService.getCompradores().subscribe(compradores => {
      this.compradores = compradores;
    });
  }

  getMotivos(): void {
    this.nfdService.getMotivos().subscribe(motivos => {
      this.motivo = motivos;
    });
  }



  adicionarNotaFiscal(): void {
    this.notaFiscal.produtosDTO = this.dataSource.data;

    this.nfdService.cadastrarNotaFiscal(this.notaFiscal).subscribe(
      (response) => {
        console.log('Nota fiscal cadastrada:', response);
        // Lógica adicional após o cadastro, se necessário
      },
      (error) => {
        console.error('Erro ao cadastrar nota fiscal:', error);
        // Tratamento de erro, se necessário
      }
    );
  }


}
