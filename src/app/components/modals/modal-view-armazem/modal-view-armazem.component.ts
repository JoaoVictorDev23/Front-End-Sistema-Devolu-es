import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { NbToastrService } from '@nebular/theme';
import { Produto } from 'src/app/interface/produtos.interface';
import { Armazem } from 'src/app/interface/armazem-interface';
import { MatTableDataSource } from '@angular/material/table';
import { ViewArmazemService } from 'src/app/services/modals/armazem/view-armazem.service';

@Component({
  selector: 'app-modal-view-armazem',
  templateUrl: './modal-view-armazem.component.html',
  styleUrls: ['./modal-view-armazem.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ModalViewArmazemComponent {

  valorArmazenado: number=0;
  notasFiscais: NotaFiscal[] = [];
  dataSource = new MatTableDataSource<NotaFiscal>(this.notasFiscais);
  displayedColumns: string[] = ['numeronfd', 'filial', 'serie', 'cte', 'situacaonfd', 'situacaofinanceiro','cadastradopor'];

  constructor(
    private dialogRef: MatDialogRef<ModalViewArmazemComponent>,
    private toastrService: NbToastrService, private armazemService:ViewArmazemService,
    @Inject(MAT_DIALOG_DATA) public data: { armazem: Armazem }
  ) {
    if (data.armazem && data.armazem.armazemId !== undefined) {
      this.getAllNotasFiscais(data.armazem.armazemId); // Chama o método para obter as notas fiscais
    } else {
      console.error('ID do armazém não está definido.');
      // Trate o erro ou informe o usuário conforme necessário
    }  }

  ngOnInit() {

  }


  voltar(): void {
    this.dialogRef.close();
  }

  getAllNotasFiscais(armazemId: number) {
    this.armazemService.getAllarmazem(armazemId).subscribe(
      (data: NotaFiscal[]) => {
        this.notasFiscais = data;

              // Calcula o valor total do armazém
      this.calcularValorArmazem();

      this.dataSource.data = this.notasFiscais; // Atualiza os dados do dataSource
      },
      (error) => {
        console.log('Erro ao obter notas fiscais:', error);
      }
    );
  }

  calcularValorArmazem() {
    let valorTotal = 0;
    this.notasFiscais.forEach(nota => {
      valorTotal += nota.valoresDTO.valorArmazem; // Supondo que 'valor' seja o campo que representa o valor da nota fiscal
    });
    this.valorArmazenado = valorTotal;
    console.log(valorTotal); // Atualiza o valor na variável 'valorArmazenado'
  }

}
