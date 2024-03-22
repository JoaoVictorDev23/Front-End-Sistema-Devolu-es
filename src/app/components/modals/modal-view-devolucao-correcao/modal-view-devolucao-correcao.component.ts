import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Produto } from 'src/app/interface/produtos.interface';
import { ProdutosDialogComponent } from '../../devolucoes/devolucoes-cadastrar/produtos-dialog/produtos-dialog.component';

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


  debitarValorCliente = false;


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.data.notaFiscal.produtosDTO;

  constructor(private dialogRef: MatDialogRef<ModalViewDevolucaoCorrecaoComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal },private dialogService: NbDialogService ) {

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
        'produtoQuantidade': produto.produtoQuantidade,
        'produtoValor': produto.produtoValor,
        'situacaoProduto': produto.situacaoProduto,
        'armazemId': produto.armazemId,
        'numeronfd': produto.numeronfd
      });

      // Atualize o dataSource para refletir as alterações na tabela
      this.dataSource = [...this.data.notaFiscal.produtosDTO];
    }
  });
}



}
