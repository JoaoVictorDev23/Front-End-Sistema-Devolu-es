import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Cliente } from 'src/app/interface/cliente-interface';
import { DadosNotasFiscais } from 'src/app/interface/dadosnfd-interface';
import { Motivo } from 'src/app/interface/motivo-interface';
import { Motorista } from 'src/app/interface/motorista-interface';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';

@Component({
  selector: 'app-submodal-editar-nfd',
  templateUrl: './submodal-editar-nfd.component.html',
  styleUrls: ['./submodal-editar-nfd.component.scss']
})
export class SubmodalEditarNfdComponent {
  motivos: Motivo[] = [];
  motivo: Motivo = {
    descriMotivo: '',
    nomeMotivo: '',

  }



  constructor(private dialogRef: MatDialogRef<SubmodalEditarNfdComponent>,
    private toastrService: NbToastrService,
    private router:Router,
    private NfdService: NfdserviceService, // Injete o serviço ClienteService

    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal }) {

    this.loadMotivo();

  }

  ngOnInit() {

    this.getMotivos();
  }
  // Método para carregar os dados do cliente

  loadMotivo() {
    const MotivoId = this.data.notaFiscal.dadosNfdDTO.motivo; // Obtenha o ID do Motivo da nota fiscal
    if (MotivoId) {
      this.NfdService.findByMotivo(MotivoId).subscribe(
        (Motivo: Motivo) => {
          this.motivo = Motivo; // Armazene os dados do Motivo na variável local
        },
        (error) => {
          console.error('Erro ao carregar dados do Motivo:', error);
        }
      );
    }
  }
  getMotivos(): void {
    this.NfdService.getMotivos().subscribe(motivos => {
      this.motivos = motivos;
      console.log(motivos);
    });
  }
  public atualizarDados(DadosDTO: DadosNotasFiscais) {
    DadosDTO.situacao = "Pendente";
    this.NfdService.updateDados(DadosDTO).subscribe(
      () => {
        // Sucesso na atualização
        this.toastrService.success('Alteração em dados realizada com sucesso!', 'Sucesso');
        setTimeout(() => {
          location.reload(); // Recarrega a página após 5 segundos
        }, 1000);
      },
      (error) => {
        // Erro na atualização
        if (error.status === 403) {
          // Se o erro for 403, execute a função logout
          this.logout();
        } else {
          this.toastrService.danger('Erro ao atualizar.', 'Erro');
          console.error('Erro ao atualizar:', error);
        }
      }
    );
  }
 // Em algum método do componente que precisa fazer o download do arquivo zipado
fazerDownload(numeroNfd: string) {
  this.NfdService.downloadFile(numeroNfd).subscribe(
    (data: Blob) => {
      // Cria um objeto URL a partir do Blob para criar o link de download
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'arquivos.zip'; // Defina o nome do arquivo zipado aqui
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Libera a URL criada para o Blob
    },
    error => {
      console.error('Erro ao baixar o arquivo zipado:', error);
      // Lógica de tratamento de erro, se necessário
      this.toastrService.danger("Erro ao baixar o arquivo zipado","Erro");
    }
  );
}
logout(): void {
  // Limpar o token JWT armazenado
  localStorage.removeItem('token');

  // Redirecionar para a página de login ou qualquer outra página desejada
  this.router.navigate(['/login']);
}

}
