import { NotaFiscal } from './../../../interface/nfd-interface';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModalDevolucoesViewComponent } from '../../modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewDevolucaoCorrecaoComponent } from '../../modals/modal-view-devolucao-correcao/modal-view-devolucao-correcao.component';
import { ModalViewDevolucaoCorrecaoGestorComponent } from '../../modals/modal-view-devolucao-correcao-gestor/modal-view-devolucao-correcao-gestor.component';
import { Motivo } from 'src/app/interface/motivo-interface';
import { Armazem } from 'src/app/interface/armazem-interface';
import { Motorista } from 'src/app/interface/motorista-interface';
import { Cliente } from 'src/app/interface/cliente-interface';
import { Produto } from 'src/app/interface/produtos.interface';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';



@Component({
  selector: 'app-correcao',
  templateUrl: './correcao.component.html',
  styleUrls: ['./correcao.component.scss']
})
export class CorrecaoComponent implements AfterViewInit {
  loading: boolean = true; // Variável para controlar o estado de carregamento

  notasFiscais: NotaFiscal[] = []; // Adicione esta propriedade



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  displayedColumns: string[] = ['numeronfd', 'filial', 'serie', 'cte', 'situacao', 'situacaovalores', 'cadastradopor', 'acoes'];
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



  constructor(public dialog: MatDialog, private nfdserviceService: NfdserviceService) {
    this.getAllNotasFiscaisByAll(); // Chama o método para obter as notas fiscais
  }
  getAllNotasFiscaisByAll() {
    this.loading = true; // Inicia o estado de carregamento

    this.nfdserviceService.getAllNotasFiscaisByAll().subscribe(
      (data: NotaFiscal[]) => {
        this.notasFiscais = data.filter(nota => nota.valoresDTO.situacaoValores !== 'Pendente' || nota.dadosNfdDTO.situacao !== 'Pendente');
        this.dataSource.data = this.notasFiscais;
        this.loading = false; // Finaliza o estado de carregamento após obter os dados
      },
      (error) => {
        console.log('Erro ao obter notas fiscais:', error);
        this.loading = false; // Finaliza o estado de carregamento em caso de erro
      }
    );
  }



  openDialog(notaFiscal: NotaFiscal) {
    const dialogRef = this.dialog.open(ModalViewDevolucaoCorrecaoGestorComponent, { data: { notaFiscal: notaFiscal } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

