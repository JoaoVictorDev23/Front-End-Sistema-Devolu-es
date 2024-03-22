import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbToastComponent, NbToastrService } from '@nebular/theme';
import { Motivo } from 'src/app/interface/motivo-interface';
import { MotivoserviceService } from 'src/app/services/motivos/motivoservice.service';
// Importe aqui o serviço para fazer a chamada API

@Component({
  selector: 'app-motivo-cadastrar',
  templateUrl: './motivo-cadastrar.component.html',
  styleUrls: ['./motivo-cadastrar.component.scss']
})
export class MotivoCadastrarComponent {
  motivo: Motivo = {  descriMotivo: '', nomeMotivo:'' }; // Inicialize o objeto motivo com valores padrão

  constructor(private motivoService: MotivoserviceService, private toastrService: NbToastrService) {} // Substitua motivoService pelo nome do seu serviço real

  cadastrarMotivo() {
    // Aqui você pode chamar o serviço para enviar os dados para a API
    this.motivoService.cadastrarMotivo(this.motivo).subscribe(
      response => {
        // Handle success response
        this.toastrService.success('Motivo cadastrado com sucesso!', 'Sucesso');
        // Você pode adicionar lógica adicional aqui, como redirecionar para outra página
      },
      error => {
        // Handle error response
        if (error.error && error.error.message) {
          this.toastrService.warning(error.error.message, 'Erro'); // Exibe a mensagem de erro para o usuário usando Toastr
        } else {
          this.toastrService.warning('Erro ao cadastrar motivo.', 'Erro'); // Caso a mensagem de erro específica não esteja disponível, exibe uma mensagem padrão
        }

        // Você pode exibir uma mensagem de erro para o usuário aqui
      }
    );
  }
}
