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
  selector: 'app-submodal-nfd',
  templateUrl: './submodal-nfd.component.html',
  styleUrls: ['./submodal-nfd.component.scss']
})
export class SubmodalNfdComponent {

    cliente: Cliente | undefined; // Declare a propriedade cliente aqui

    motivo: Motivo | undefined; // Declare a propriedade cliente aqui

    motorista: Motorista | undefined; // Declare a propriedade cliente aqui

  constructor(private dialogRef: MatDialogRef<SubmodalNfdComponent>,
    private toastrService: NbToastrService,
    private NfdService: NfdserviceService, // Injete o serviço ClienteService

    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {
      this.loadCliente();
      this.loadMotorista();
      this.loadMotivo();




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

    // Métodos para atualizar a situação ao clicar nos botões
    aprovarSituacao(id: string) {
      this.atualizarSituacao(id, 'APROVADA');
    }

    correcaoSituacao(id: string) {
      this.atualizarSituacao(id, 'CORRECAO');
    }

    rejeitarSituacao(id: string) {
      this.atualizarSituacao(id, 'REJEITADA');
    }
    private atualizarSituacao(id: string, situacao: string) {
      this.NfdService.updateSituacao(id, situacao).subscribe(
        () => {
          // Sucesso na atualização
          this.toastrService.success('Situação atualizada com sucesso!', 'Sucesso');
          this.dialogRef.close();
        },
        (error) => {
          // Erro na atualização
          this.toastrService.danger('Erro ao atualizar situação.', 'Erro');
          console.error('Erro ao atualizar situação:', error);
        }
      );
    }



}
