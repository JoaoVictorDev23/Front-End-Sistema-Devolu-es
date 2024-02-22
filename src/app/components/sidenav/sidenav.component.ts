import { Component, Inject } from '@angular/core';
import { NB_WINDOW, NbMenuItem, NbMenuService,NbToastrService } from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';
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
            { title: 'Visualizar devoluções', link: '/devolucoes/listar' },
            { title: 'Cadastrar nova devolução', link: '/devolucao/cadastrar' }

          ]
        },
        {
          title: 'Armazém',
          icon: 'cube-outline',
          link: 'armazem',
          children: [
            { title: 'Visualizar armazéns', link: '/armazem/listar' },
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
          title: 'Visualizar notas',
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
      title: 'Minhas notas',
      icon: 'file-text',
      link: '/minhasnotas'
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



  items2 = [
    { title: 'Minhas notas', link:'/minhasnotas' },
    { title: 'Logout' },
  ];

  constructor(private nbMenuService: NbMenuService,    private toastrService: NbToastrService, // Adicione NbToastrService aqui
  ) {
  }
  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        let toastrMessage: string;

        if (title === 'Logout') {
          toastrMessage = 'Você escolheu sair do sistema!';
          this.showAlert('Alerta', toastrMessage, 'warning');
        } else {
          toastrMessage = `${title}!`;
          this.showAlert('Redirecionando para:', toastrMessage, 'success');
        }
      });
  }

  private showAlert(title: string, message: string, status: string): void {
    this.toastrService.show(message, title, { status });
  }


}
