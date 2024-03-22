import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalDevolucoesViewComponent } from '../modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { ModalViewDevolucaoExcluirComponent } from '../modals/modal-view-devolucao-excluir/modal-view-devolucao-excluir.component';
import { ModalDevolucaoEditComponent } from '../modals/modal-devolucao-edit/modal-devolucao-edit.component';

@Component({
  selector: 'app-minhasnotas',
  templateUrl: './minhasnotas.component.html',
  styleUrls: ['./minhasnotas.component.scss']
})
export class MinhasnotasComponent implements AfterViewInit {
  notasFiscais: NotaFiscal[] = []; // Adicione esta propriedade



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

displayedColumns: string[] = ['numeronfd', 'filial','serie','cte', 'situacao','valorVenda','valorPrejuizo','valorArmazem', 'acoes'];
dataSource = new MatTableDataSource();

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
constructor(public dialog: MatDialog) {

  this.notasFiscais = [
  ];

  // Inicialize o dataSource.data com a lista de notas fiscais
  this.dataSource.data = this.notasFiscais.filter(notaFiscal => notaFiscal.dadosNfdDTO.situacao === 'Pendente' || notaFiscal.valoresDTO.situacaoValores === 'Pendente');
}

openDialog(notaFiscal: NotaFiscal) {
  const dialogRef = this.dialog.open(ModalDevolucoesViewComponent, {data:{notaFiscal: notaFiscal}});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
openDialogExcluir(notaFiscal: NotaFiscal) {
  const dialogRef = this.dialog.open(ModalViewDevolucaoExcluirComponent, {data:{notaFiscal: notaFiscal}});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
openDialogAtualizar(notaFiscal: NotaFiscal) {
  const dialogRef = this.dialog.open(ModalDevolucaoEditComponent, {data:{notaFiscal: notaFiscal}});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
