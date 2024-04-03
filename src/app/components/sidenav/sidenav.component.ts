import { Component, Inject } from '@angular/core';
import { NB_WINDOW, NbMenuItem, NbMenuService,NbToastrService } from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Usuario } from 'src/app/interface/usuario-interface';
import { ServiceUsuarioService } from 'src/app/services/usuario/service-usuario.service';
import { AuthService } from 'src/app/services/authservice.service';


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
          title: 'Notas de Devoluções',
          icon: 'undo-outline',
          children: [
            { title: 'Visualizar NF-D', link: '/devolucoes/listar', icon: 'eye-outline'},
            { title: 'Cadastrar NF-D', link: '/devolucao/cadastrar',icon:'plus-circle-outline'},
            { title: 'Inserir Valores',  link: '/gerarfinancas',      icon:'checkmark-square-outline'},
          ]
        },
        {
          title: 'Armazém',
          icon: 'cube-outline',
          link: 'armazem',
          children: [
            { title: 'Listar Armazéns', link: '/armazem/listar',icon: 'eye-outline'},
            { title: 'Novo Armazém', link: '/armazem/cadastrar',icon:'plus-circle-outline'}
          ]
        },
        {title:'Cadastro de Pessoa',
        icon: 'person-add-outline',
        link: '/pessoa'

       },
       { title:'Cadastro de Motivos',
         icon: 'message-circle-outline',
         link: '/motivo/cadastrar'
       },
       {
        title:'Cadastro de Cliente',
        icon:'car-outline',
        link:'/cliente/cadastrar'

       },
      ],
    },
    {
      title: 'Painel de Gestor',
      icon: 'file-text-outline',
      hidden: !this.authService.hasPermission(['0','2']),
      children: [
        {
          title: 'NFs Validadas',
          icon: 'eye-outline',
          link: '/aprovacao/correcao',

        },
        { title: 'Validações Pendentes', link: '/aprovacao',icon:'checkmark-square-outline' },

        {title:'Cadastro de Usuário',
        icon: 'person-add',
        link: '/usuario'
       },

      ],
    },

    {
      title: 'Minha Área',
      icon: 'person-outline',
      children:[
        {
          title:'NFs Validadas',
          link: '/minhasnotas',
          icon: 'list-outline'

        },
        {
        title: 'NF-D Pendentes',
        link: '/minhasnotas-correcao',
        icon:'question-mark-circle-outline'
      },


      ]
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
      link:'/login'
    },

  ];



  items2 = [
    { title: 'Minhas NFs', link:'/minhasnotas' },
    { title: 'NFs Pendentes', link:'/minhasnotas-correcao' },
    { title: 'Alterar Senha'},
    { title: 'Sair', link:'/login' },
  ];

  constructor(private nbMenuService: NbMenuService,    private toastrService: NbToastrService, // Adicione NbToastrService aqui
              private userService: ServiceUsuarioService,private authService:AuthService
  ) {
  }
  ngOnInit() {
    this.loadUser();
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


  usuario: Usuario = {
    name:'',
    cpf:'',
    email:'',
    perfis:[0],
    senha:''
  }

  loadUser() {

      this.userService.getUserByEmail().subscribe(
        (user: Usuario) => {
          this.usuario =  user; // Armazene os dados do Pessoa na variável local
        },
        (error) => {
          console.error('Erro ao carregar dados do Pessoa:', error);
        }
      );
    }
  }



