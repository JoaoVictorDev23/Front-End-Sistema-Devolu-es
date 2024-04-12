import { ArmazemCadastrarService } from 'src/app/services/armazem/armazem-cadastrar.service';
import { Armazem } from './../../../interface/armazem-interface';
import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-armazem-cadastrar',
  templateUrl: './armazem-cadastrar.component.html',
  styleUrls: ['./armazem-cadastrar.component.scss']
})
export class ArmazemCadastrarComponent {

  constructor(private armazemService: ArmazemCadastrarService, private toastrService: NbToastrService) {} // Substitua armazemService pelo nome do seu serviço real

  armazem: Armazem = {
    armazemNome: '',
    armazemEndereco: '',
    armazemFilial: ''
  }


  create(){
    // Aqui você pode chamar o serviço para enviar os dados para a API
    this.armazemService.cadastrararmazem(this.armazem).subscribe(
      response => {
        // Handle success response
        this.toastrService.success('Armazem cadastrado com sucesso!', 'Sucesso');
        // Você pode adicionar lógica adicional aqui, como redirecionar para outra página
      },
      error => {
        // Handle error response
        if (error.error && error.error.message) {
          this.toastrService.warning(error.error.message, 'Erro'); // Exibe a mensagem de erro para o usuário usando Toastr
        } else {
          this.toastrService.warning('Erro ao cadastrar Armazem.', 'Erro'); // Caso a mensagem de erro específica não esteja disponível, exibe uma mensagem padrão
        }

        // Você pode exibir uma mensagem de erro para o usuário aqui
      }
    );
  }
}
