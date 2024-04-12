import { ArmazemCadastrarService } from './../../../services/armazem/armazem-cadastrar.service';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalViewArmazemComponent } from '../../modals/modal-view-armazem/modal-view-armazem.component';
import { Armazem } from 'src/app/interface/armazem-interface'; // Importe a interface Armazem
import { Router } from '@angular/router';

@Component({
  selector: 'app-armazem-listar',
  templateUrl: './armazem-listar.component.html',
  styleUrls: ['./armazem-listar.component.scss']
})
export class ArmazemListarComponent implements AfterViewInit {
  armazens: Armazem[] = []; // Adicione esta propriedade
  loading: boolean = true; // Variável para controlar o estado de carregamento

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['armazem', 'filial', 'endereco',  'acoes'];
  dataSource = new MatTableDataSource<Armazem>(); // Altere o tipo de dados aqui

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public dialog: MatDialog,private armazemService:ArmazemCadastrarService,private router:Router) {
    // Popule a lista de armazéns conforme necessário
    this.getAllarmazem();
    // Inicialize o dataSource.data com a lista de armazéns
    this.dataSource.data = this.armazens;
  }

  openDialog(armazem: Armazem) {
    const dialogRef = this.dialog.open(ModalViewArmazemComponent, {
      data: { armazem: { ...armazem } } // Usando spread operator para criar uma cópia dos dados
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getAllarmazem() {
    this.armazemService.getAllarmazem().subscribe(
      (data: Armazem[]) => {
        this.armazens = data;
        this.dataSource.data = this.armazens; // Atualiza os dados do dataSource
        this.loading = false; // Finaliza o estado de carregamento após obter os dados

      },
      (error) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
          this.loading = false; // Finaliza o estado de carregamento após obter os dados

        });
        console.log('Erro ao obter Armazens!', error);
      }
    );
  }
}
