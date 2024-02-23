import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';




@Component({
  selector: 'app-modal-view-devolucao-excluir',
  templateUrl: './modal-view-devolucao-excluir.component.html',
  styleUrls: ['./modal-view-devolucao-excluir.component.scss']
})
export class ModalViewDevolucaoExcluirComponent {
  displayedColumns: string[] = ['nomeprod','situacaoprod','valorprod','quantidadeprod'];
  dataSource = this.data.notaFiscal.produtos;

  constructor(private dialogRef: MatDialogRef<ModalViewDevolucaoExcluirComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) { }


  voltar(): void {
    this.dialogRef.close();
  }

}


