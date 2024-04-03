import { ArmazemCadastrarService } from 'src/app/services/armazem/armazem-cadastrar.service';
import { Armazem } from './../../../interface/armazem-interface';
import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-armazem-cadastrar',
  templateUrl: './armazem-cadastrar.component.html',
  styleUrls: ['./armazem-cadastrar.component.scss']
})
export class ArmazemCadastrarComponent {

  constructor(private armazemService: ArmazemCadastrarService, private toastrService: NbToastrService, private router: Router) {} // Substitua armazemService pelo nome do seu serviço real

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
        // Recarrega a página após o toastr ser exibido
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/armazem/cadastrar']); // Navega para a rota de cadastro de armazém
          });
        }, 1000); 
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
