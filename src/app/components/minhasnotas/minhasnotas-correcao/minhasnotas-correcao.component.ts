import { ModalViewDevolucaoCorrecaoComponent } from './../../modals/modal-view-devolucao-correcao/modal-view-devolucao-correcao.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ModalDevolucoesViewComponent } from '../../modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';
import { MatDialog } from '@angular/material/dialog';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minhasnotas-correcao',
  templateUrl: './minhasnotas-correcao.component.html',
  styleUrls: ['./minhasnotas-correcao.component.scss']
})
export class MinhasnotasCorrecaoComponent implements AfterViewInit{
  notasFiscais: NotaFiscal[] = [];
  dataSource = new MatTableDataSource<NotaFiscal>(this.notasFiscais);
  displayedColumns: string[] = ['numeronfd', 'filial', 'serie', 'cte', 'situacaonfd', 'situacaofinanceiro', 'acoes'];
  situacaoPendente = 'Pendente';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private nfdserviceService: NfdserviceService, private router:Router) {
    this.getAllNotasFiscais();
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
        this.notasFiscais = data.filter(nota => nota.valoresDTO.situacaoValores === 'Pendente' && nota.dadosNfdDTO.situacao === 'Pendente');
        this.dataSource.data = this.notasFiscais;
      },
      (error) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
        console.log('Erro ao obter notas fiscais:', error);
      }
    );
  }

  aprovar(notaFiscal: NotaFiscal) {
    const dialogRef = this.dialog.open(ModalViewDevolucaoCorrecaoComponent, { data: { notaFiscal: notaFiscal } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
