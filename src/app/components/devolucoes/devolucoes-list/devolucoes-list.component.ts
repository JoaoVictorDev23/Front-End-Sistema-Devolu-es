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
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-devolucoes-list',
  templateUrl: './devolucoes-list.component.html',
  styleUrls: ['./devolucoes-list.component.scss'],
})
export class DevolucoesListComponent implements AfterViewInit {

  loading: boolean = true; // Variável para controlar o estado de carregamento


  notasFiscais: NotaFiscal[] = [];
  dataSource = new MatTableDataSource<NotaFiscal>(this.notasFiscais);
  displayedColumns: string[] = ['numeronfd', 'situacaonfd', 'situacaofinanceiro','cadastradopor', 'atualizadopor','acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private toastrService: NbToastrService, private nfdserviceService: NfdserviceService,private router: Router) {
    this.getAllNotasFiscais(); // Chama o método para obter as notas fiscais
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchString = filter.toLowerCase();

      return (
        data.dadosNfdDTO.numeroNfd.toLowerCase().includes(searchString)
      );
    };
  }

  getAllNotasFiscais() {
    this.nfdserviceService.getAllNotasFiscaisByAll().subscribe(
      (data: NotaFiscal[] | null) => {
        try {
          if (data) {
            this.notasFiscais = data;
            this.dataSource.data = this.notasFiscais;
          } else {
            throw new Error('Array de notas fiscais é nulo.');
          }
        } catch (error) {
          console.log('Erro ao filtrar notas fiscais:', error);
          this.toastrService.danger('Erro ao filtrar notas fiscais.', 'Erro');
        } finally {
          this.loading = false; // Finaliza o estado de carregamento após tentar obter e filtrar os dados
        }
      },
      (error) => {
        console.log('Erro ao obter notas fiscais:', error);
        this.toastrService.danger('Erro ao obter notas fiscais.', 'Erro');
        this.loading = false; // Finaliza o estado de carregamento em caso de erro
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
