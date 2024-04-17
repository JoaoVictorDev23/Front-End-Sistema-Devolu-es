import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { Cliente } from 'src/app/interface/cliente-interface';
import { Motivo } from 'src/app/interface/motivo-interface';
import { Motorista } from 'src/app/interface/motorista-interface';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';

@Component({
  selector: 'app-submodal-ver-nfd',
  templateUrl: './submodal-ver-nfd.component.html',
  styleUrls: ['./submodal-ver-nfd.component.scss']
})
export class SubmodalVerNfdComponent {

  cliente: Cliente | undefined; // Declare a propriedade cliente aqui
  pessoa: Pessoa | undefined; // Declare a propriedade cliente aqui

  motivo: Motivo | undefined; // Declare a propriedade cliente aqui

  motorista: Motorista | undefined; // Declare a propriedade cliente aqui

constructor(private dialogRef: MatDialogRef<SubmodalVerNfdComponent>,
  private toastrService: NbToastrService,
  private NfdService: NfdserviceService, // Injete o serviço ClienteService

  @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {
    this.loadCliente();
    this.loadMotorista();
    this.loadMotivo();
    this.loadPessoa();




   }
     // Método para carregar os dados do cliente
loadCliente() {
  const clienteId = this.data.notaFiscal.valoresDTO.cliente; // Obtenha o ID do cliente da nota fiscal
  if (clienteId) {
    this.NfdService.findByCliente(clienteId).subscribe(
      (cliente: Cliente) => {
        this.cliente = cliente; // Armazene os dados do cliente na variável local
      },
      (error) => {
        console.error('Erro ao carregar dados do cliente:', error);
      }
    );
  }
}
loadPessoa() {
  const PessoaId = this.data.notaFiscal.valoresDTO.pessoa; // Obtenha o ID do Pessoa da nota fiscal
  if (PessoaId) {
    this.NfdService.findByPessoa(PessoaId).subscribe(
      (Pessoa: Pessoa) => {
        this.pessoa = Pessoa; // Armazene os dados do Pessoa na variável local
      },
      (error) => {
        console.error('Erro ao carregar dados do Pessoa:', error);
      }
    );
  }
}
loadMotorista() {
  const MotoristaId = this.data.notaFiscal.valoresDTO.motorista; // Obtenha o ID do Motorista da nota fiscal
  if (MotoristaId) {
    this.NfdService.findByMotorista(MotoristaId).subscribe(
      (Motorista: Motorista) => {
        this.motorista = Motorista; // Armazene os dados do Motorista na variável local
      },
      (error) => {
        console.error('Erro ao carregar dados do Motorista:', error);
      }
    );
  }
}
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



}
