import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sistema de Devoluções';

  private getRangeLabel(page: number, pageSize: number, length: number): string {
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `${start} – ${end} de ${length}`;
  }


  constructor(private paginatorIntl: MatPaginatorIntl) {

    this.paginatorIntl.itemsPerPageLabel = 'Itens por página';
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
  }

}
