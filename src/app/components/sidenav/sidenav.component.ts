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
      link: '/home',

    },
    {
      title: 'Cadastros',
      icon: 'list-outline',
      children: [
        {
          title: 'Devolução',
          icon: 'undo-outline',
          children: [
            { title: 'Vizualizar devoluções', link: '/devolucoes/listar' },
            { title: 'Cadastrar nova devolução', link: '/devolucao/cadastrar' }

          ]
        },
        {
          title: 'Armazém',
          icon: 'cube-outline',
          link: 'armazem',
          children: [
            { title: 'Vizualizar armazéns', link: '/armazem/listar' },
            { title: 'Cadastrar novo armazém', link: '/armazem/cadastrar' }
          ]
        },
        {title:'Pessoa',
        icon: 'person-add-outline',
        link: '/pessoa'

       },
       { title:'Motivos Devolutivos',
         icon: 'message-circle-outline',
         link: '/motivo/cadastrar'
       },
      ],
    },
    {
      title: 'Validar Notas',
      icon: 'file-text-outline',
      children: [
        { title: 'Gerar validação', link: '/aprovacao', icon: 'checkmark-circle-outline' },
        {
          title: 'Vizualizar notas',
          link: '/aprovacao/list',
          icon: 'eye-outline',
          children: [
            { title: 'Aprovadas', link: '/aprovacao/aprovados', icon: 'done-all-outline' },
            { title: 'Em correção', link: '/aprovacao/correcao', icon: 'refresh-outline' },
            { title: 'Rejeitadas', link: '/aprovacao/rejeitadas', icon: 'close-outline' },
          ]
        }
      ],
    },

    {
      title: 'Informações',
      icon: 'alert-circle-outline',
      children:[
        {
          title: 'Sobre',
          icon: 'info-outline',
          link: '/sobre'
        },
        {
          title: 'Ajuda',
          icon: 'question-mark-circle-outline',
          link: '/ajuda'
        },
      ]
    },
    {
      title: 'Sair',
      icon: 'log-out-outline',
      link: '/ajuda'
    },

  ];
}
