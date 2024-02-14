import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DevolucoesCadastrarComponent } from './components/devolucoes/devolucoes-cadastrar/devolucoes-cadastrar.component';
import { DevolucoesListComponent } from './components/devolucoes/devolucoes-list/devolucoes-list.component';
import { AprovacaoComponent } from './components/aprovacao/pendentes/aprovacao.component';
import { AprovadosComponent } from './components/aprovacao/aprovados/aprovados.component';
import { RejeitadasComponent } from './components/aprovacao/rejeitadas/rejeitadas.component';
import { CorrecaoComponent } from './components/aprovacao/correcao/correcao.component';
import { ArmazemCadastrarComponent } from './components/armazem/armazem-cadastrar/armazem-cadastrar.component';
import { ArmazemListarComponent } from './components/armazem/armazem-listar/armazem-listar.component';
import { MotivoCadastrarComponent } from './components/motivo/motivo-cadastrar/motivo-cadastrar.component';
import { AjudaComponent } from './components/ajuda/ajuda.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { PessoaCadastrarComponent } from './components/pessoa/pessoa-cadastrar/pessoa-cadastrar.component';

const routes: Routes = [
  {
    path:'', component:SidenavComponent,
    children:[
      {path: 'home',component: HomeComponent},
      {path: 'devolucoes/listar', component:DevolucoesListComponent},
      {path:'devolucao/cadastrar', component:DevolucoesCadastrarComponent},

      {path:'motivo/cadastrar', component:MotivoCadastrarComponent},


      {path:'pessoa', component: PessoaCadastrarComponent},

      {path:'armazem/cadastrar', component:ArmazemCadastrarComponent},
      {path:'armazem/listar', component:ArmazemListarComponent},

      {path:'aprovacao', component: AprovacaoComponent},
      {path:'aprovacao/aprovados', component:AprovadosComponent},
      {path:'aprovacao/rejeitadas', component:RejeitadasComponent},
      {path:'aprovacao/correcao', component:CorrecaoComponent},

      {path:'ajuda', component:AjudaComponent},
      {path:'sobre', component: SobreComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
