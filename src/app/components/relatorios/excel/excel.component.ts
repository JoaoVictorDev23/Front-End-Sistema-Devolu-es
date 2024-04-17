import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { NfdserviceService } from 'src/app/services/nfd/nfdservice.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements AfterViewInit {

  loading: boolean = false; // Variável para controlar o estado de carregamento
  // Definindo os dados estáticos
  ELEMENT_DATA = [
    { planilhas: 'Planilha Geral', downloadFunction: this.gerarExcel.bind(this) },

  ];

  notasFiscais: NotaFiscal[] = [];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['planilhas', 'baixar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private toastrService: NbToastrService, private nfdserviceService: NfdserviceService,private router: Router) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
  gerarExcel() {
    this.loading = true;
    const nomeArquivo = 'nome-do-arquivo'; // Defina o nome do arquivo aqui
    this.nfdserviceService.gerarExcel(nomeArquivo).subscribe(
      (data: ArrayBuffer) => {
        this.downloadExcelFile(data, `${nomeArquivo}.xlsx`);
        this.loading = false;

      },
      error => {
        console.error('Erro ao gerar o arquivo Excel:', error);
      }
    );
  }


  private downloadExcelFile(data: ArrayBuffer, filename: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}
