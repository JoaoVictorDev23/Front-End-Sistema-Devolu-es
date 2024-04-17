import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Produto } from '../../../../interface/produtos.interface';


@Component({
  selector: 'app-produtos-dialog',
  templateUrl: './produtos-dialog.component.html',
  styleUrls: ['./produtos-dialog.component.scss']
})
export class ProdutosDialogComponent {
  produto: Produto = { produtoNome: '', produtoQuantidade: 0, produtoValor: 0,produtoDesconto:0 , situacaoProduto: 'Pendente', armazemId:0,numeronfd:'0'};
  isFormValid = false; // Add this variable


  @Output() produtoAdicionado = new EventEmitter<Produto>();

  constructor(@Inject(NbDialogRef) protected ref: NbDialogRef<ProdutosDialogComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.produto);
    console.log(this.produto);
  }
  checkFormValidity() {

    this.isFormValid = !!(this.produto.produtoNome && this.produto.produtoValor && this.produto.produtoQuantidade );
  }



}
