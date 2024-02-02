import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  items: NbMenuItem[] = [

    {
      title: 'Página Inicial',
      icon: 'home-outline',
      link: 'home', // Link para a página
    },
    {
      title: 'Produtos',
      icon: 'shopping-cart-outline',
      link: 'produtos',
      children: [
        { title: 'Ver Todos', link: 'produtos/lista' },
        { title: 'Cadastrar Novo', link: 'produtos/novo' },
      ],
    },
    {
      title: 'Devoluções',
      icon: 'undo-outline',
      link: 'devolucao',
      children: [
        { title: 'Ver Todos', link: 'devolucoes/lista' },
        { title: 'Cadastrar nova devolução', link: 'devolucao/cadastrar' },
        { title: 'Atualizar uma devolução', link: 'devolucao/update' },
        { title: 'Excluir uma devolução', link: 'devolucao/excluir' },
      ],
    },
    // ... outros itens do menu
  ];

  //Denominando validações dos campos da etapa 1

}
