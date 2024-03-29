import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Produto } from 'src/app/interface/produtos.interface';
import { ChatMessage } from '../../modal-devolucao-edit/modal-devolucao-edit.component';


@Component({
  selector: 'app-modal-devolucoes-view',
  templateUrl: './modal-devolucoes-view.component.html',
  styleUrls: ['./modal-devolucoes-view.component.scss']
})
export class ModalDevolucoesViewComponent {


  debitarValorCliente = false;

  selectedItem = '2';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.data.notaFiscal.produtosDTO;

  constructor(private dialogRef: MatDialogRef<ModalDevolucoesViewComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {

     }




  voltar(): void {
    this.dialogRef.close();
  }

  showChat: boolean = false;

  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  aprovar(): void {
    // Lógica de aprovação
  }

  ngOnInit(): void {

  }
  //Logica de envio de mensagem e Mecanismos do CHat


  messages: ChatMessage[] = [];

  sendMessage(event: any): void {
    if (event.message) {
      this.messages.push({
        text: event.message,
        date: new Date(),
        type: 'text',
        reply: false, // Add this line to fix the error
        user: {
          name: 'User', // Replace with actual user name
          avatar: '', // Leave it empty for now
        },
      });
    } else {
      this.toastrService.danger('Please enter a message', 'Error');
    }
  }


//calcular
calcularValoresTotais() {
  let valorVenda = 0;
  let valorPrejuizo = 0;
  let valorArmazem = 0;

  this.data.notaFiscal.produtosDTO.forEach((produto: Produto) => {
    switch (produto.situacaoProduto) {
      case 'Em armazem':
        valorArmazem += produto.produtoQuantidade *produto.produtoValor;
        break;
      case 'Venda':
        valorVenda += produto.produtoQuantidade *produto.produtoValor;
        break;
      case 'Prejuizo':
        valorPrejuizo += produto.produtoQuantidade *produto.produtoValor;
        break;
      default:
        break;
    }
  });

  this.data.notaFiscal.valoresDTO.valorArmazem = valorArmazem;
  this.data.notaFiscal.valoresDTO.valorVenda = valorVenda;
  this.data.notaFiscal.valoresDTO.valorPrejuizo = valorPrejuizo;


}
}

