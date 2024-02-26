import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
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

const ELEMENT_DATA2: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-modal-view-devolucao-correcao',
  templateUrl: './modal-view-devolucao-correcao.component.html',
  styleUrls: ['./modal-view-devolucao-correcao.component.scss']
})
export class ModalViewDevolucaoCorrecaoComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.data.notaFiscal.produtos;

  constructor(private dialogRef: MatDialogRef<ModalViewDevolucaoCorrecaoComponent>,
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

  //Logica de envio de mensagem
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


}
