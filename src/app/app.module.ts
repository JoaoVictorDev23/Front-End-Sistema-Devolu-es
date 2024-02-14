import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbStepperModule,
  NbThemeModule,
  NbTreeGridModule,

} from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevolucoesCadastrarComponent } from './components/devolucoes/devolucoes-cadastrar/devolucoes-cadastrar.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProdutosDialogComponent } from './components/devolucoes/devolucoes-cadastrar/produtos-dialog/produtos-dialog.component';
import { DevolucoesListComponent } from './components/devolucoes/devolucoes-list/devolucoes-list.component';
import { AprovacaoComponent } from './components/aprovacao/pendentes/aprovacao.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { AprovadosComponent } from './components/aprovacao/aprovados/aprovados.component';
import { RejeitadasComponent } from './components/aprovacao/rejeitadas/rejeitadas.component';
import { CorrecaoComponent } from './components/aprovacao/correcao/correcao.component';
import { ArmazemCadastrarComponent } from './components/armazem/armazem-cadastrar/armazem-cadastrar.component';
import { ArmazemListarComponent } from './components/armazem/armazem-listar/armazem-listar.component';
import { ModalViewArmazemComponent } from './components/modals/modal-view-armazem/modal-view-armazem.component';
import { ModalViewDevolucoesComponent } from './components/modals/modal-view-devolucoes/modal-view-devolucoes.component';
import { MotivoCadastrarComponent } from './components/motivo/motivo-cadastrar/motivo-cadastrar.component';
import { AjudaComponent } from './components/ajuda/ajuda.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { PessoaCadastrarComponent } from './components/pessoa/pessoa-cadastrar/pessoa-cadastrar.component';







@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    DevolucoesCadastrarComponent,
    ProdutosDialogComponent,
    DevolucoesListComponent,
    AprovacaoComponent,
    AprovadosComponent,
    RejeitadasComponent,
    CorrecaoComponent,
    ArmazemCadastrarComponent,
    ArmazemListarComponent,
    ModalViewArmazemComponent,
    ModalViewDevolucoesComponent,
    MotivoCadastrarComponent,
    AjudaComponent,
    SobreComponent,
    PessoaCadastrarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterModule,
    MatTableModule,
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),NbMenuModule.forRoot(),NbIconModule,MatPaginatorModule,
    NbLayoutModule, NbButtonModule, BrowserAnimationsModule,NbStepperModule,
    NbThemeModule.forRoot({ name: 'default' }), NbEvaIconsModule, NbCardModule,
    FormsModule,MatInputModule,NbInputModule,NbSelectModule,CommonModule,MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
