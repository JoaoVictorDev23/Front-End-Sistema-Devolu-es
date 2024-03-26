import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ModalViewArmazemComponent } from '../../modals/modal-view-armazem/modal-view-armazem.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDevolucoesViewComponent } from '../../modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';
import { ModalViewDevolucaoExcluirComponent } from '../../modals/modal-view-devolucao-excluir/modal-view-devolucao-excluir.component';
import { ModalDevolucaoEditComponent } from '../../modals/modal-devolucao-edit/modal-devolucao-edit.component';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devolucoes-list',
  templateUrl: './devolucoes-list.component.html',
  styleUrls: ['./devolucoes-list.component.scss'],
})
export class DevolucoesListComponent implements AfterViewInit {
  notasFiscais: NotaFiscal[] = [];
  dataSource = new MatTableDataSource<NotaFiscal>(this.notasFiscais);
  displayedColumns: string[] = ['numeronfd', 'filial', 'serie', 'cte', 'situacaonfd', 'situacaofinanceiro', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private nfdserviceService: NfdserviceService,private router: Router) {
    this.getAllNotasFiscais(); // Chama o método para obter as notas fiscais
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllNotasFiscais() {
    this.nfdserviceService.getAllNotasFiscais().subscribe(
      (data: NotaFiscal[]) => {
        this.notasFiscais = data;
        this.dataSource.data = this.notasFiscais; // Atualiza os dados do dataSource
      },
      (error) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
        console.log('Erro ao obter notas fiscais:', error);
      }
    );
  }

  openDialog(notaFiscal: NotaFiscal) {
    const dialogRef = this.dialog.open(ModalDevolucoesViewComponent, { data: { notaFiscal: notaFiscal } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogExcluir(notaFiscal: NotaFiscal) {
    const dialogRef = this.dialog.open(ModalViewDevolucaoExcluirComponent, { data: { notaFiscal: notaFiscal } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogAtualizar(notaFiscal: NotaFiscal) {
    const dialogRef = this.dialog.open(ModalDevolucaoEditComponent, { data: { notaFiscal: notaFiscal } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
