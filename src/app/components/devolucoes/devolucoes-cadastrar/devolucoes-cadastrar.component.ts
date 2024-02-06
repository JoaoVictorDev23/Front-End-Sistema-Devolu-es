import { Component } from '@angular/core';

@Component({
  selector: 'app-devolucoes-cadastrar',
  templateUrl: './devolucoes-cadastrar.component.html',
  styleUrls: ['./devolucoes-cadastrar.component.scss']
})
export class DevolucoesCadastrarComponent {

  linearMode = false;

  products: any[] = [
    {
      name: 'Produto 1',
      price: 100,
      category: 'Categoria 1',
    },
    {
      name: 'Produto 2',
      price: 200,
      category: 'Categoria 2',
    },
    {
      name: 'Produto 3',
      price: 300,
      category: 'Categoria 3',
    },
  ];
}
