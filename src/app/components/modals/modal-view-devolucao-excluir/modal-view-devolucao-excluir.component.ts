import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Produto } from 'src/app/interface/produtos.interface';
import { ChatMessage, ModalDevolucaoEditComponent } from '../modal-devolucao-edit/modal-devolucao-edit.component';




@Component({
  selector: 'app-modal-view-devolucao-excluir',
  templateUrl: './modal-view-devolucao-excluir.component.html',
  styleUrls: ['./modal-view-devolucao-excluir.component.scss']
})
export class ModalViewDevolucaoExcluirComponent {
}

