import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProdutosDialogComponent } from 'src/app/components/devolucoes/devolucoes-cadastrar/produtos-dialog/produtos-dialog.component';
import { Cliente } from 'src/app/interface/cliente-interface';
import { ValoresNotaFiscal } from 'src/app/interface/financeironfd-interface';
import { Motivo } from 'src/app/interface/motivo-interface';
import { Motorista } from 'src/app/interface/motorista-interface';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { Produto } from 'src/app/interface/produtos.interface';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';

@Component({
  selector: 'app-submodal-solicitar-financeiro',
  templateUrl: './submodal-solicitar-financeiro.component.html',
  styleUrls: ['./submodal-solicitar-financeiro.component.scss']
})
export class SubmodalSolicitarFinanceiroComponent {
  displayedColumns: string[] = ['produtonome', 'produtovalor', 'produtodesconto', 'produtoquantidade','produtosituacao'];
  dataSource = this.data.notaFiscal.produtosDTO;

  compradores: Pessoa[] = [];

  clientes: Cliente[] = [];
  cliente: Cliente = { cnpj: '', nome: ''};
  pessoa: Pessoa = { nome: '', cpf: '', email: ''}; // Declare a propriedade cliente aqui

  motivo: Motivo | undefined; // Declare a propriedade cliente aqui

  motoristas: Motorista[] = [];
  motorista: Motorista = { nome: '', email: '', cpf: ''} // Declare a propriedade cliente aqui

  ngOnInit() {
    this.getCompradores();
    this.getMotoristas();
    this.getClientes();

  }


  constructor(private dialogRef: MatDialogRef<SubmodalSolicitarFinanceiroComponent>,
    private toastrService: NbToastrService, private dialogService: NbDialogService,
    private NfdService: NfdserviceService, // Injete o serviço ClienteService

    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal }) {

    this.loadCliente();
    this.loadMotorista();
    this.loadPessoa();

  }

  getCompradores(): void {
    this.NfdService.getCompradores().subscribe(compradores => {
      this.compradores = compradores;
    });
  }
  getClientes(): void {
    this.NfdService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  getMotoristas(): void {
    this.NfdService.getMotoristas().subscribe(motoristas => {
      this.motoristas = motoristas;
    });
  }
  //calcular
  calcularValoresTotais() {
    let valorVenda = 0;
    let valorPrejuizo = 0;
    let valorArmazem = 0;
    let valorDesconto = 0;

    this.data.notaFiscal.produtosDTO.forEach((produto: Produto) => {
      switch (produto.situacaoProduto) {
        case 'Em armazem':
          valorArmazem += produto.produtoQuantidade * produto.produtoValor;
          break;
        case 'Venda':

          valorVenda += produto.produtoQuantidade * produto.produtoValor;
          valorDesconto = (valorVenda * produto.produtoDesconto) / 100;

          valorVenda -= valorDesconto;
          break;
        case 'Prejuizo':
          valorPrejuizo += produto.produtoQuantidade * produto.produtoValor;
          break;
        default:
          break;
      }
    });

    this.data.notaFiscal.valoresDTO.valorArmazem = valorArmazem;
    this.data.notaFiscal.valoresDTO.valorVenda = valorVenda;
    this.data.notaFiscal.valoresDTO.valorPrejuizo = valorPrejuizo;


  }

  compararValores(element: any) {
    const valorOriginal = element.valor;

    // Verificar se o novo valor é maior que a quantidade disponível
    if (element.valor > valorOriginal) {
      alert(`O valor inserido (${element.valor}) não pode ser maior que a quantidade disponível (${valorOriginal}).`);
      // Resetar o valor para a quantidade disponível
    }
  }

  //Abrir Adicionar Produtos
  openDialog(): void {
    const dialogRef = this.dialogService.open(ProdutosDialogComponent);

    dialogRef.onClose.subscribe((produto: Produto) => {
      if (produto) {
        this.data.notaFiscal.produtosDTO.push({
          'produtoNome': produto.produtoNome,
          'produtoQuantidade': produto.produtoQuantidade,
          'produtoValor': produto.produtoValor,
          'produtoDesconto':produto.produtoDesconto,
          'situacaoProduto': produto.situacaoProduto,
          'armazemId': produto.armazemId,
          'numeronfd': produto.numeronfd
        });

        // Atualize o dataSource para refletir as alterações na tabela
        this.dataSource = [...this.data.notaFiscal.produtosDTO];
      }
    });
  }
  loadPessoa() {
    const PessoaId = this.data.notaFiscal.valoresDTO.pessoa; // Obtenha o ID do Pessoa da nota fiscal
    if (PessoaId) {
      this.NfdService.findByPessoa(PessoaId).subscribe(
        (Pessoa: Pessoa) => {
          this.pessoa = Pessoa; // Armazene os dados do Pessoa na variável local
        },
        (error) => {
          console.error('Erro ao carregar dados do Pessoa:', error);
        }
      );
    }
  }

  UpdateValores(valoresDTO: ValoresNotaFiscal) {
    this.atualizarValores(valoresDTO);
  }

  private atualizarValores(valoresDTO: ValoresNotaFiscal) {
    valoresDTO.situacaoValores = "Pendente";
    this.NfdService.updateValores(valoresDTO).subscribe(
      () => {
        // Sucesso na atualização
        this.toastrService.success('Valores atualizados com sucesso!', 'Sucesso');
        this.dialogRef.close();
      },
      (error) => {
        // Erro na atualização
        this.toastrService.danger('Erro ao atualizar valores.', 'Erro');
        console.error('Erro ao atualizar valores:', error);
      }
    );
  }

  atualizarProdutosEValores(produtosDTOList: Produto[], valoresDTO: ValoresNotaFiscal) {
    console.log(produtosDTOList);
      // Definir produto_nfd para cada produto
  const numeroNfd = this.data.notaFiscal.dadosNfdDTO.numeroNfd;
  produtosDTOList.forEach(produto => {
    produto.numeronfd = numeroNfd;
  });


    this.NfdService.updateProdutos(produtosDTOList).subscribe(
      response => {
        this.atualizarValores(valoresDTO);
        // Trate a resposta aqui, se necessário
        this.toastrService.success('Produtos atualizados com sucesso!', 'Sucesso');

        console.log('Produtos atualizados com sucesso:', response);
      },
      error => {
        // Trate erros aqui, se necessário
        this.toastrService.danger('Erro ao atualizar Produtos.', 'Erro');

        console.error('Erro ao atualizar produtos:', error);
      }
    );
  }



  // Método para carregar os dados do cliente
  loadCliente() {
    const clienteId = this.data.notaFiscal.valoresDTO.cliente; // Obtenha o ID do cliente da nota fiscal
    if (clienteId) {
      this.NfdService.findByCliente(clienteId).subscribe(
        (cliente: Cliente) => {
          this.cliente = cliente; // Armazene os dados do cliente na variável local
          this.data.notaFiscal.valoresDTO.cliente = cliente.id!;
        },
        (error) => {
          console.error('Erro ao carregar dados do cliente:', error);
        }
      );
    }
  }

  loadMotorista() {
    const MotoristaId = this.data.notaFiscal.valoresDTO.motorista; // Obtenha o ID do Motorista da nota fiscal
    if (MotoristaId) {
      this.NfdService.findByMotorista(MotoristaId).subscribe(
        (Motorista: Motorista) => {
          this.motorista = Motorista; // Armazene os dados do Motorista na variável local
          this.data.notaFiscal.valoresDTO.motorista = Motorista.id!.toString();

        },
        (error) => {
          console.error('Erro ao carregar dados do Motorista:', error);
        }
      );
    }
  }
  loadMotivo() {
    const MotivoId = this.data.notaFiscal.dadosNfdDTO.motivo; // Obtenha o ID do Motivo da nota fiscal
    if (MotivoId) {
      this.NfdService.findByMotivo(MotivoId).subscribe(
        (Motivo: Motivo) => {
          this.motivo = Motivo; // Armazene os dados do Motivo na variável local
        },
        (error) => {
          console.error('Erro ao carregar dados do Motivo:', error);
        }
      );
    }
  }

}
