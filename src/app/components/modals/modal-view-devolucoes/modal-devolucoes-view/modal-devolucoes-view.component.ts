import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';


@Component({
  selector: 'app-modal-devolucoes-view',
  templateUrl: './modal-devolucoes-view.component.html',
  styleUrls: ['./modal-devolucoes-view.component.scss']
})
export class ModalDevolucoesViewComponent {
  displayedColumns: string[] = ['nomeprod','situacaoprod','valorprod','quantidadeprod'];
  dataSource = this.data.notaFiscal.dados.produtos;

  constructor(private dialogRef: MatDialogRef<ModalDevolucoesViewComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) { }


  voltar(): void {
    this.dialogRef.close();
  }

}
