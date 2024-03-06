import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

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
  NbAutocompleteModule,
  NbUserModule,
  NbContextMenuModule,
  NbWindowModule,
  NbToastrModule,
  NbChatModule,
  NbToggleModule,
  NbBadgeModule

} from '@nebular/theme';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevolucoesCadastrarComponent } from './components/devolucoes/devolucoes-cadastrar/devolucoes-cadastrar.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProdutosDialogComponent } from './components/devolucoes/devolucoes-cadastrar/produtos-dialog/produtos-dialog.component';
import { DevolucoesListComponent } from './components/devolucoes/devolucoes-list/devolucoes-list.component';
import { AprovacaoComponent } from './components/aprovacao/pendentes/aprovacao.component';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { AprovadosComponent } from './components/aprovacao/aprovados/aprovados.component';
import { RejeitadasComponent } from './components/aprovacao/rejeitadas/rejeitadas.component';
import { CorrecaoComponent } from './components/aprovacao/correcao/correcao.component';
import { ArmazemCadastrarComponent } from './components/armazem/armazem-cadastrar/armazem-cadastrar.component';
import { ArmazemListarComponent } from './components/armazem/armazem-listar/armazem-listar.component';
import { ModalViewArmazemComponent } from './components/modals/modal-view-armazem/modal-view-armazem.component';
import { MotivoCadastrarComponent } from './components/motivo/motivo-cadastrar/motivo-cadastrar.component';
import { AjudaComponent } from './components/ajuda/ajuda.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { PessoaCadastrarComponent } from './components/pessoa/pessoa-cadastrar/pessoa-cadastrar.component';
import { MatIconModule } from '@angular/material/icon';
import { ModalDevolucoesViewComponent } from './components/modals/modal-view-devolucoes/modal-devolucoes-view/modal-devolucoes-view.component';
import { ModalDevolucaoEditComponent } from './components/modals/modal-devolucao-edit/modal-devolucao-edit.component';
import { ModalViewDevolucaoExcluirComponent } from './components/modals/modal-view-devolucao-excluir/modal-view-devolucao-excluir.component';
import { MinhasnotasComponent } from './components/minhasnotas/minhasnotas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MinhasnotasCorrecaoComponent } from './components/minhasnotas/minhasnotas-correcao/minhasnotas-correcao.component';
import { ModalViewDevolucaoCorrecaoComponent } from './components/modals/modal-view-devolucao-correcao/modal-view-devolucao-correcao.component';
import { ModalViewDevolucaoCorrecaoGestorComponent } from './components/modals/modal-view-devolucao-correcao-gestor/modal-view-devolucao-correcao-gestor.component';
import { FinancaSolicitarComponent } from './components/financas/financa-solicitar/financa-solicitar.component';
import { SubmodalNfdComponent } from './components/modals/modal-view-validacao/submodal-nfd/submodal-nfd.component';
import { SubmodalFinanceiroComponent } from './components/modals/modal-view-validacao/submodal-financeiro/submodal-financeiro.component';








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
    MotivoCadastrarComponent,
    AjudaComponent,
    SobreComponent,
    PessoaCadastrarComponent,
    ModalDevolucoesViewComponent,
    ModalDevolucaoEditComponent,
    ModalViewDevolucaoExcluirComponent,
    MinhasnotasComponent,
    MinhasnotasCorrecaoComponent,
    ModalViewDevolucaoCorrecaoComponent,
    ModalViewDevolucaoCorrecaoGestorComponent,
    FinancaSolicitarComponent,
    SubmodalNfdComponent,
    SubmodalFinanceiroComponent,


  ],
  imports: [
    BrowserModule,NgxMaskDirective,
    AppRoutingModule,RouterModule,
    MatTableModule,MatIconModule,NbChatModule,
    NbDialogModule.forRoot(),    NbToastrModule.forRoot(),MatTabsModule,NbToggleModule,ReactiveFormsModule,
    NbSidebarModule.forRoot(),NbMenuModule.forRoot(),NbIconModule,MatPaginatorModule,NbBadgeModule,
    NbLayoutModule, NbButtonModule, BrowserAnimationsModule,NbStepperModule,NbContextMenuModule ,NbWindowModule,
    NbThemeModule.forRoot({ name: 'default' }), NbEvaIconsModule, NbCardModule,MatDialogModule,NbUserModule,
    FormsModule,MatInputModule,NbInputModule,NbSelectModule,CommonModule,MatFormFieldModule,NbAutocompleteModule

  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
