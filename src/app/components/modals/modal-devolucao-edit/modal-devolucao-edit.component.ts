import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Produto } from 'src/app/interface/produtos.interface';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';



export interface ChatMessage {
  text: string;
  date: Date;
  reply: boolean;
  type: 'text' | 'file';
  files?: {
    url: string;
    type: string;
    icon: string;
  }[];
  user: {
    name: string;
    avatar: string;
  };
}

@Component({
  selector: 'app-modal-devolucao-edit',
  templateUrl: './modal-devolucao-edit.component.html',
  styleUrls: ['./modal-devolucao-edit.component.scss']
})
export class ModalDevolucaoEditComponent  {


  debitarValorCliente = false;

  selectedItem = '2';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.data.notaFiscal.produtosDTO;

  constructor(private dialogRef: MatDialogRef<ModalDevolucaoEditComponent>,
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
calcularvaloresDTOTotais() {
  let valorVenda = 0;
  let valorPrejuizo = 0;
  let valorArmazem = 0;

  this.data.notaFiscal.produtosDTO.forEach((produto: Produto) => {
    switch (produto.situacaoProduto) {
      case 'Em armazem':
        valorArmazem += produto.produtoQuantidade * produto.produtoValor;
        break;
      case 'Venda':
        valorVenda += produto.produtoQuantidade * produto.produtoValor;
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
}

