import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Produto } from 'src/app/interface/produtos.interface';
import { ProdutosDialogComponent } from 'src/app/components/devolucoes/devolucoes-cadastrar/produtos-dialog/produtos-dialog.component';

@Component({
  selector: 'app-submodal-financeiro',
  templateUrl: './submodal-financeiro.component.html',
  styleUrls: ['./submodal-financeiro.component.scss']
})
export class SubmodalFinanceiroComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.data.notaFiscal.dados.produtos;


  constructor(private dialogRef: MatDialogRef<SubmodalFinanceiroComponent>,
    private toastrService: NbToastrService,private dialogService: NbDialogService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {

     }

     //calcular
calcularValoresTotais() {
  let valorVenda = 0;
  let valorPrejuizo = 0;
  let valorArmazem = 0;

  this.data.notaFiscal.dados.produtos.forEach((produto: Produto) => {
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

  this.data.notaFiscal.valores.valorArmazem = valorArmazem;
  this.data.notaFiscal.valores.valorVenda = valorVenda;
  this.data.notaFiscal.valores.valorPrejuizo = valorPrejuizo;


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
      this.data.notaFiscal.dados.produtos.push({
        'nome': produto.nome,
        'quantidade': produto.quantidade,
        'valor': produto.valor,
        'situacao': produto.situacao,
        'armazem': produto.armazem,
        'numeronfd': produto.numeronfd
      });

      // Atualize o dataSource para refletir as alterações na tabela
      this.dataSource = [...this.data.notaFiscal.dados.produtos];
    }
  });
}

}
