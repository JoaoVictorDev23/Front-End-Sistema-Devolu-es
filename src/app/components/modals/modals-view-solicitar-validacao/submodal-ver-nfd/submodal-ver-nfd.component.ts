import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';

@Component({
  selector: 'app-submodal-ver-nfd',
  templateUrl: './submodal-ver-nfd.component.html',
  styleUrls: ['./submodal-ver-nfd.component.scss']
})
export class SubmodalVerNfdComponent {

  debitarValorMotorista = true;
  debitarValorCliente = false;


  constructor(private dialogRef: MatDialogRef<SubmodalVerNfdComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {

     }


}
