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

  valorArmazenado: number=0;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSourceProd: Produto[] = [];
  dataSource: NotaFiscal[] = [];
  columnsToDisplay = ['numeroNfd', 'filial', 'serie', 'cte', 'valorArmazem', 'valorVenda', 'valorPrejuizo'];
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
      this.dataSource = this.data.armazem.notasfiscais;
      this.valorArmazenado = this.calcularTotalArmazenado();

    }
  }

  expandRow(element: NotaFiscal) {
    this.expandedElement = this.expandedElement === element ? null : element;

    if (this.expandedElement) {
      // Filtrar produtos com base na notaFiscal selecionada
      const filteredProducts = this.expandedElement.produtos.filter(
        (produto) => this.expandedElement && produto.numeronfd === this.expandedElement.numeroNfd
        );
      this.dataSourceProd = [...filteredProducts];
        // Atualizar valorArmazenado do armazem

    this.valorArmazenado = this.calcularTotalArmazenado();

      // Imprimir produtos para esta nota fiscal no console
      this.expandedElement.produtos.forEach((produto) => {
        console.log(produto);
      });
    } else {
      // Se a nota fiscal estiver fechada, limpar a lista de produtos
      this.dataSourceProd = [];
    }
  }
  calcularTotalArmazenado(): number {
    let totalArmazenado = 0;

    if (this.dataSource && this.dataSource.length > 0) {
      totalArmazenado = this.dataSource.reduce((acc, nf) => acc + nf.valorArmazem, 0);
    }

    return totalArmazenado;
  }

  voltar(): void {
    this.dialogRef.close();
  }
}
