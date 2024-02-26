import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { NbToastrService } from '@nebular/theme';
import { Produto } from 'src/app/interface/produtos.interface';
import { Armazem } from 'src/app/interface/armazem-interface';

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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSourceProd: Produto[] = [];
  dataSource: NotaFiscal[] = [];
  columnsToDisplay = ['Numeronfd', 'filial', 'serie', 'cte', 'valorArmazenado', 'valorVenda', 'valorPrejuizo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: NotaFiscal | null = null;

  constructor(
    private dialogRef: MatDialogRef<ModalViewArmazemComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { armazem: Armazem }
  ) {}

  ngOnInit() {
    console.log(this.data.armazem);
    if (this.data.armazem.notasfiscais) {
      // Limpe dataSourceProd antes de preenchê-lo novamente
      this.dataSourceProd = [];

      // Iterar sobre cada nota fiscal
      this.data.armazem.notasfiscais.forEach((notaFiscal) => {
        console.log(`Produtos da Nota Fiscal ${notaFiscal.numeroNfd}:`);
        if (notaFiscal.produtos) {
          // Adicionar a lista de produtos da nota fiscal à dataSourceProd
          this.dataSourceProd.push(...notaFiscal.produtos);

          // Imprimir produtos para esta nota fiscal no console
          notaFiscal.produtos.forEach((produto) => {
            console.log(produto);
          });
        }
      });

      // Preencha dataSource com as notas fiscais do armazém
      this.dataSource = this.data.armazem.notasfiscais;
    }
  }

  voltar(): void {
    this.dialogRef.close();
  }
}
