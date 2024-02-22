import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAprovarNfdComponent } from '../../modals/modal-aprovar-nfd/modal-aprovar-nfd.component';
import { MatDialog } from '@angular/material/dialog';

export interface AprovacaoInterface {
  numeroNFD: string;
  filial: string;
  serie: string;
  cte: string;
  valorPrejuizo: string;
  valorVenda: string;
  valorArmazenado: string;
}

const FAKE_DATA: AprovacaoInterface[] = Array.from({ length: 10 }, (_, index) => createFakeData(index + 1));

@Component({
  selector: 'app-aprovacao',
  templateUrl: './aprovacao.component.html',
  styleUrls: ['./aprovacao.component.scss']
})
export class AprovacaoComponent implements AfterViewInit {
  displayedColumns: string[] = ['numeroNFD', 'filial','serie','cte', 'valorPrejuizo', 'valorVenda', 'valorArmazenado', 'aprovar'];
  dataSource: MatTableDataSource<AprovacaoInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(FAKE_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAprovarNfdComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  aprovar(row: AprovacaoInterface) {
    this.openDialog();

    console.log('Aprovando:', row);
  }
}

function createFakeData(id: number): AprovacaoInterface {
  return {
    numeroNFD: 'NFD' + id,
    filial: (Math.random() * 1000).toFixed(2),
    serie:(Math.random() * 1000).toFixed(2),
    cte:(Math.random() * 1000).toFixed(2),
    valorPrejuizo: (Math.random() * 1000).toFixed(2),
    valorVenda: (Math.random() * 2000).toFixed(2),
    valorArmazenado: (Math.random() * 500).toFixed(2),
  };
}
