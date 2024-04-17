import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';
import { ModalViewDevolucaoCorrecaoComponent } from '../../modals/modal-view-devolucao-correcao/modal-view-devolucao-correcao.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financa-solicitar',
  templateUrl: './financa-solicitar.component.html',
  styleUrls: ['./financa-solicitar.component.scss']
})
export class FinancaSolicitarComponent implements AfterViewInit {
  notasFiscais: NotaFiscal[] = [];
  dataSource = new MatTableDataSource<NotaFiscal>(this.notasFiscais);
  displayedColumns: string[] = ['numeronfd', 'filial', 'serie', 'cte', 'situacaonfd', 'situacaofinanceiro', 'acoes'];
  situacaoPendente = 'Pendente';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private nfdserviceService: NfdserviceService,private router: Router) {
    this.getAllNotasFiscais();
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
    this.nfdserviceService.getAllNotasFiscais().subscribe(
      (data: NotaFiscal[]) => {
        this.notasFiscais = data.filter(nota => nota.valoresDTO.situacaoValores === 'Aguardando Valores');
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
