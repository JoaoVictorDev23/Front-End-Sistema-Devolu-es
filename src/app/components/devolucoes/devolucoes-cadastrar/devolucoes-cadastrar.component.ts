import { Motivo } from './../../../interface/motivo-interface';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService, NbStepperComponent, NbToastrService } from '@nebular/theme';
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
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/authservice.service';

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



  notaFiscal: NotaFiscal = {
    dadosNfdDTO: {
      filial: '',
      serie: '',
      cte: '',
      situacao: 'Pendente',
      numeroNfd: '',
      numeroNfo: '',
      observacao: '',
      motivo: 0,
      status:'',
      data: new Date(),
      anexo:''


    },
    valoresDTO: {
      valorVenda: 0,
      valorPrejuizo: 0,
      valorArmazem: 0,
      situacaoValores: 'Aguardando Valores',
      pessoa:'0',
      armazem:0 ,
      motorista: '0',
      cliente:0 ,
      debitadoCliente:0,
      debitadoMotorista:0,
      numeronfd:'',
      data: new Date()
    },
    produtosDTO:[

    ]

  };
  debitarValorCliente = false;
  debitarValorMotorista = true;
  linearMode = true;

  displayedColumns: string[] = ['nome', 'quantidade', 'valor', 'situacao', 'acao'];
  dataSource = new MatTableDataSource<Produto>();

  authToken: string | null;


  constructor(private dialogService: NbDialogService,
    private nfdService: NfdserviceService,
    private toastrService:NbToastrService,
    private router:Router,
    private http: HttpClient, private authService: AuthService) {
      this.authToken = this.authService.extractAuthToken();
    }
  verdados(){
    console.log(this.notaFiscal);
  }

  ngOnInit() {
    this.calcularSomaProdutos();
    this.getClientes();
    this.getMotoristas();
    this.getArmazens();
    this.getMotivos();
    this.getCompradores();
  }

  todosCamposSelecionados(): boolean {
    return (
      this.notaFiscal.valoresDTO.cliente !== 0 &&
      this.notaFiscal.valoresDTO.motorista !== "0" &&
      this.notaFiscal.valoresDTO.pessoa !== "0" &&
      this.notaFiscal.valoresDTO.armazem !== 0
    );
  }

  openDialog(): void {
    const dialogRef = this.dialogService.open(ProdutosDialogComponent);

    dialogRef.onClose.subscribe((produto: Produto) => {
      if (produto) {
        this.notaFiscal.produtosDTO.push({
          'produtoNome': produto.produtoNome,
          'produtoQuantidade': produto.produtoQuantidade,
          'produtoValor': produto.produtoValor,
          'produtoDesconto':produto.produtoDesconto,
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
      console.log(motivos);
    });
  }



  adicionarNotaFiscal(): void {
    this.notaFiscal.produtosDTO = this.dataSource.data;
    this.uploadFiles();


    this.nfdService.cadastrarNotaFiscal(this.notaFiscal).subscribe(
      response => {
        // Handle success response
        this.toastrService.success('Nota de Devolução cadastrado com sucesso.!', 'Sucesso');
        // Você pode adicionar lógica adicional aqui, como redirecionar para outra página
      },
      error => {
        // Handle error response
        if (error.error && error.error.message) {
          this.toastrService.warning(error.error.message, 'Erro'); // Exibe a mensagem de erro para o usuário usando Toastr
        } else {
          this.toastrService.warning('Erro ao cadastrar Devolução.!', 'Erro'); // Caso a mensagem de erro específica não esteja disponível, exibe uma mensagem padrão
        }

        // Você pode exibir uma mensagem de erro para o usuário aqui
      }
    );
  }
  navegarParaGerarFinancas() {
    this.router.navigate(['/gerarfinancas']);
  }
  navegarParaTelaInicial() {
    this.router.navigate(['/home']);
  }
  navegarNovoCadastro(){
    this.router.navigate(['/devolucao/cadastrar']);
  }


  // Parte de Anexos
  numeroNota: string = ''; // Variável para armazenar o número da nota fiscal

  filesToUpload: FileList | null = null;

  onFileChange(event: any) {
    this.filesToUpload = event.target.files;
  }

  uploadFiles() {
    this.numeroNota = this.notaFiscal.dadosNfdDTO.numeroNfd;
    if (this.filesToUpload && this.numeroNota) {
      this.nfdService.uploadFiles(this.filesToUpload, this.numeroNota).subscribe(
        response => {
          console.log('Arquivos enviados com sucesso!', response);
          // Lógica adicional após o upload, se necessário
          this.toastrService.info("Anexos salvos com sucesso!","Atenção:")
        },
        error => {
          console.error('Erro ao enviar arquivos:', error);
          // Lógica de tratamento de erro, se necessário

        }
      );
    } else {
      console.warn('Selecione arquivos e informe o número da nota fiscal.');
    }
  }
  
  

}
