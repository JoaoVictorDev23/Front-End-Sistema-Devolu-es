import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalDevolucoesViewComponent } from '../modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { ModalViewDevolucaoExcluirComponent } from '../modals/modal-view-devolucao-excluir/modal-view-devolucao-excluir.component';
import { ModalDevolucaoEditComponent } from '../modals/modal-devolucao-edit/modal-devolucao-edit.component';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-minhasnotas',
  templateUrl: './minhasnotas.component.html',
  styleUrls: ['./minhasnotas.component.scss']
})
export class MinhasnotasComponent implements AfterViewInit {
  notasFiscais: NotaFiscal[] = []; // Adicione esta propriedade
  loading: boolean = true; // Variável para controlar o estado de carregamento



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  displayedColumns: string[] = ['numeronfd', 'filial', 'serie', 'cte', 'situacaonfd', 'situacaofinanceiro', 'acoes'];
  dataSource = new MatTableDataSource();

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

  constructor(public dialog: MatDialog, private nfdserviceService: NfdserviceService, private router: Router, private toastrService: NbToastrService) {
    this.getAllNotasFiscais();
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

  getAllNotasFiscais() {
    this.nfdserviceService.getAllNotasFiscais().subscribe(
      (data: NotaFiscal[] | null) => {
        try {
          if (data) {
            this.notasFiscais = data.filter(
              nota =>
                nota.valoresDTO.situacaoValores !== 'Pendente' &&
                nota.dadosNfdDTO.situacao !== 'Pendente'
            );
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





}
