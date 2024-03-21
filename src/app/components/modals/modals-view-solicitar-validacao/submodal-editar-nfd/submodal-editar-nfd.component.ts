import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';

@Component({
  selector: 'app-submodal-editar-nfd',
  templateUrl: './submodal-editar-nfd.component.html',
  styleUrls: ['./submodal-editar-nfd.component.scss']
})
export class SubmodalEditarNfdComponent  {

  debitarValorMotorista = true;
  debitarValorCliente = false;


  constructor(private dialogRef: MatDialogRef<SubmodalEditarNfdComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {

     }


}
