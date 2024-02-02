import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DevolucoesCadastrarComponent } from './components/devolucoes/devolucoes-cadastrar/devolucoes-cadastrar.component';

const routes: Routes = [
  {
    path:'', component:SidenavComponent,
    children:[
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'home',component: HomeComponent},
      {path:'devolucao/cadastrar', component:DevolucoesCadastrarComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
