import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Produto } from '../../../../interface/produtos.interface';


@Component({
  selector: 'app-produtos-dialog',
  templateUrl: './produtos-dialog.component.html',
  styleUrls: ['./produtos-dialog.component.scss']
})
export class ProdutosDialogComponent {
  produto: Produto = { nome: '', quantidade: 0, valor: 0 , situacao: 'Pendente', armazem:0,numeronfd:0};
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

    this.isFormValid = !!(this.produto.nome && this.produto.valor && this.produto.quantidade );
  }



}
