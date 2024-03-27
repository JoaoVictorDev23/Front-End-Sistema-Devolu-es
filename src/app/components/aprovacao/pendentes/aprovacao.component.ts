import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { ModalViewDevolucaoCorrecaoGestorComponent } from '../../modals/modal-view-devolucao-correcao-gestor/modal-view-devolucao-correcao-gestor.component';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';


@Component({
  selector: 'app-aprovacao',
  templateUrl: './aprovacao.component.html',
  styleUrls: ['./aprovacao.component.scss']
})
export class AprovacaoComponent implements AfterViewInit {
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
      const notaFiscal = data as NotaFiscal;
      return (
        notaFiscal.valoresDTO.cadastradopor.toLowerCase().includes(filter) ||
        notaFiscal.dadosNfdDTO.numeroNfd.toLowerCase().includes(filter)
      );
    };
  }





  constructor(public dialog: MatDialog, private nfdserviceService: NfdserviceService) {
    this.getAllNotasFiscaisByAll(); // Chama o método para obter as notas fiscais
  }

  aprovar(notaFiscal: NotaFiscal) {
    const dialogRef = this.dialog.open(ModalViewDevolucaoCorrecaoGestorComponent, { data: { notaFiscal: notaFiscal } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getAllNotasFiscaisByAll() {
    this.loading = true; // Inicia o estado de carregamento

    this.nfdserviceService.getAllNotasFiscaisByAll().subscribe(
      (data: NotaFiscal[]) => {
        this.notasFiscais = data.filter(nota => nota.valoresDTO.situacaoValores === 'Pendente' || nota.dadosNfdDTO.situacao === 'Pendente');
        this.dataSource.data = this.notasFiscais;
        this.loading = false; // Finaliza o estado de carregamento após obter os dados
      },
      (error) => {
        console.log('Erro ao obter notas fiscais:', error);
        this.loading = false; // Finaliza o estado de carregamento em caso de erro
      }
    );
  }

}
