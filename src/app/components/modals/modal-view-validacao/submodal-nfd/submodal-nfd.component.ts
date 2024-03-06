import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';

@Component({
  selector: 'app-submodal-nfd',
  templateUrl: './submodal-nfd.component.html',
  styleUrls: ['./submodal-nfd.component.scss']
})
export class SubmodalNfdComponent {

  constructor(private dialogRef: MatDialogRef<SubmodalNfdComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { notaFiscal: NotaFiscal } ) {

     }


}
