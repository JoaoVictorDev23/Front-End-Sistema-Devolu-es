import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';



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
      title: 'Devoluções',
      icon: 'undo-outline',
      link: 'devolucao',
      children: [
        { title: 'Ver Todos', link: 'devolucoes/listar' },
        { title: 'Cadastrar nova devolução', link: 'devolucao/cadastrar' }
      ],
    },
    {
      title: 'Armazém',
      icon: 'cube-outline',
      link: 'armazem', // Link para a página
      children: [
        { title: 'Ver Todos', link: 'armazem/listar' },
        { title: 'Cadastrar novo armazém', link: 'armazem/cadastrar' }
      ],
    },
    // ... outros itens do menu
  ];

  //Denominando validações dos campos da etapa 1

}
