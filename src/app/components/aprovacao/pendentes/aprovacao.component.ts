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
  notasFiscais: NotaFiscal[] = []; // Adicione esta propriedade



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  displayedColumns: string[] = ['numeronfd', 'filial','serie','cte', 'situacao','situacaovalores','valorVenda','valorPrejuizo','valorArmazem','cadastradopor','acoes'];
dataSource = new MatTableDataSource();

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
constructor(public dialog: MatDialog, private nfdserviceService: NfdserviceService) {
  this.getAllNotasFiscaisByAll(); // Chama o método para obter as notas fiscais
}

aprovar(notaFiscal: NotaFiscal) {
  const dialogRef = this.dialog.open(ModalViewDevolucaoCorrecaoGestorComponent, {data:{notaFiscal: notaFiscal}});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
getAllNotasFiscaisByAll() {
  this.nfdserviceService.getAllNotasFiscais().subscribe(
    (data: NotaFiscal[]) => {
      this.notasFiscais = data.filter(nota => nota.valoresDTO.situacaoValores === 'Pendente' || nota.dadosNfdDTO.situacao ==='Pendente');
      this.dataSource.data = this.notasFiscais;
    },
    (error) => {
      console.log('Erro ao obter notas fiscais:', error);
    }
  );
}
}
