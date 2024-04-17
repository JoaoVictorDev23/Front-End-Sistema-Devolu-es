import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProdutosDialogComponent } from 'src/app/components/devolucoes/devolucoes-cadastrar/produtos-dialog/produtos-dialog.component';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { Produto } from 'src/app/interface/produtos.interface';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';

@Component({
  selector: 'app-submodal-ver-financeiro',
  templateUrl: './submodal-ver-financeiro.component.html',
  styleUrls: ['./submodal-ver-financeiro.component.scss']
})
export class SubmodalVerFinanceiroComponent {
  displayedColumns: string[] = ['produtonome','produtodesconto','produtovalor', 'produtoquantidade','produtosituacao'];
  dataSource = this.data.notaFiscal.produtosDTO;

  pessoa: Pessoa | undefined; // Declare a propriedade cliente aqui



  constructor(private dialogRef: MatDialogRef<SubmodalVerFinanceiroComponent>,
    private toastrService: NbToastrService,private dialogService: NbDialogService,
    private NfdService: NfdserviceService, // Injete o serviço ClienteService

    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {

     }

     //calcular
calcularValoresTotais() {
  let valorVenda = 0;
  let valorPrejuizo = 0;
  let valorArmazem = 0;

  this.data.notaFiscal.produtosDTO.forEach((produto: Produto) => {
    switch (produto.situacaoProduto) {
      case 'Em armazem':
        valorArmazem +=produto.produtoQuantidade * produto.produtoValor;
        break;
      case 'Venda':
        valorVenda +=produto.produtoQuantidade * produto.produtoValor;
        break;
      case 'Prejuizo':
        valorPrejuizo +=produto.produtoQuantidade * produto.produtoValor;
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

  console.log(valorOriginal);
  console.log(element.valor);
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
        'produtoQuantidade':produto.produtoQuantidade,
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

}
