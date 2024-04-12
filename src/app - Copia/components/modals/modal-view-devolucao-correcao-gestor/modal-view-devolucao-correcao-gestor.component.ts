import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Produto } from 'src/app/interface/produtos.interface';
import { Usuario } from 'src/app/interface/usuario-interface';
import { ServiceUsuarioService } from 'src/app/services/usuario/service-usuario.service';


export interface ChatMessage {
  message: string;
  type: 'text',
  nfdVinculada: String; // NFD vinculada
  date: Date;
  reply: boolean;

  sender: string; // Email do remetente
  user: {
    name: string;

  };
}
export interface Mensagems {
  message: string;
  usuario: string;
  nfdVinculada: String;
  datahora: Date;
}



@Component({
  selector: 'app-modal-view-devolucao-correcao-gestor',
  templateUrl: './modal-view-devolucao-correcao-gestor.component.html',
  styleUrls: ['./modal-view-devolucao-correcao-gestor.component.scss']
})
export class ModalViewDevolucaoCorrecaoGestorComponent {


  debitarValorCliente = false;

  selectedItem = '2';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.data.notaFiscal.produtosDTO;

  constructor(private dialogRef: MatDialogRef<ModalViewDevolucaoCorrecaoGestorComponent>,
    private toastrService: NbToastrService,private userService: ServiceUsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal }) {

  }




  voltar(): void {
    this.dialogRef.close();
  }

  showChat: boolean = false;

  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  ngOnInit(): void {
    this.loadUser();
    this.fetchChatMessages();

  }
  //Logica de envio de mensagem e Mecanismos do CHat


  messages: ChatMessage[] = [];
  mensagemDTO: Mensagems = {
    message:'',
    usuario:'',
    nfdVinculada:this.data.notaFiscal.dadosNfdDTO.numeroNfd,
    datahora:new Date()
  }

  sendMessage(event: any): void {
    if (event.message) {
      const newMessage: ChatMessage = {
        message: event.message,
        type: 'text',
        reply: true,
        user: { name: this.usuario.email }, // Substitua pelo nome do usuário real
        nfdVinculada: this.data.notaFiscal.dadosNfdDTO.numeroNfd , // Substitua pela NFD real vinculada
        date: new Date(),
        sender: this.usuario.email // Email do remetente

      };
      this.mensagemDTO.usuario = this.usuario.email;
      this.mensagemDTO.message = event.message;
      this.criarMensagem();
      this.messages.push(newMessage);

    } else {
      this.toastrService.danger('Por favor, digite uma mensagem', 'Erro');
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
  usuario: Usuario = {
    name: '',
    cpf: '',
    email: '',
    perfis: [0],
    senha: ''
  }
  loadUser() {

    this.userService.getUserByEmail().subscribe(
      (user: Usuario) => {
        this.usuario =  user; // Armazene os dados do Pessoa na variável local

      },
      (error) => {
        console.error('Erro ao carregar dados do Pessoa:', error);
      }
    );
  }
  criarMensagem() {
    const chatMessageDTO: Mensagems =  this.mensagemDTO;
    this.userService.createMessage(chatMessageDTO).subscribe(
      () => {
        console.log('Mensagem criada com sucesso!');
        // Realizar ações adicionais após a criação da mensagem
      },
      error => {
        console.error('Erro ao criar mensagem:', error);
      }
    );
  }
  fetchChatMessages(): void {
    this.userService.getMessagesByNfd(this.data.notaFiscal.dadosNfdDTO.numeroNfd).subscribe(
      (messages: Mensagems[]) => {
        // Process and assign fetched messages to this.messages array
        this.messages = messages.map((msg) => ({
          message: msg.message,
          type: 'text',
          user: { name: msg.usuario },
          nfdVinculada: msg.nfdVinculada,
          date: msg.datahora, // Você pode modificar isso conforme o formato real da data da sua API
          sender: msg.usuario, // Email do remetente da mensagem
          reply: msg.usuario === this.usuario.email, // Set reply based on sender email

        }));
      console.log(messages)},
      (error) => {
        console.error('Erro ao buscar mensagens de chat:', error);
      }
    );
  }



}
