import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';

@Component({
  selector: 'app-submodal-solicitar-nfd',
  templateUrl: './submodal-solicitar-nfd.component.html',
  styleUrls: ['./submodal-solicitar-nfd.component.scss']
})
export class SubmodalSolicitarNfdComponent {

  debitarValorMotorista = true;
  debitarValorCliente = false;


  constructor(private dialogRef: MatDialogRef<SubmodalSolicitarNfdComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {

     }


}
