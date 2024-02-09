import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { ProdutosDialogComponent } from './produtos-dialog/produtos-dialog.component';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Produto } from './produtos-dialog/produtos.interface';




@Component({
  selector: 'app-devolucoes-cadastrar',
  templateUrl: './devolucoes-cadastrar.component.html',
  styleUrls: ['./devolucoes-cadastrar.component.scss']
})
export class DevolucoesCadastrarComponent {

  linearMode = false;

  displayedColumns: string[] = ['nome', 'quantidade', 'valor', 'acao'];
  dataSource = new MatTableDataSource<Produto>();

  notasFiscais: NotaFiscal[] = [];

  constructor(private dialogService: NbDialogService) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialogService.open(ProdutosDialogComponent);

    dialogRef.onClose.subscribe((produto: Produto) => {
      if (produto) {
        this.dataSource.data.push({
          'nome': produto.nome,
          'quantidade': produto.quantidade,
          'valor': produto.valor,
        });

        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }
    // Adicione uma função para adicionar uma nova nota fiscal
    adicionarNotaFiscal(notaFiscal: NotaFiscal): void {
      this.notasFiscais.push(notaFiscal);
      // Idealmente, você deve enviar os dados da nota fiscal para o banco de dados neste ponto.
    }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluirProduto(produto: Produto): void {
    const index = this.dataSource.data.indexOf(produto);

    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    }
  }
}
