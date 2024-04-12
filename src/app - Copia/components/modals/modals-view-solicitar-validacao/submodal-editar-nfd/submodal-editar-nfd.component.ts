import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
        this.toastrService.success('Alteração realizada com sucesso!', 'Sucesso');
        this.dialogRef.close();
      },
      (error) => {
        // Erro na atualização
        this.toastrService.danger('Erro ao atualizar.', 'Erro');
        console.error('Erro ao atualizar:', error);
      }
    );
  }


}
