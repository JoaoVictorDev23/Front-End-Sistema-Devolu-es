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
import { ArmazemComponent } from './components/devolucoes/armazem/armazem.component';
import { DevolucoesCadastrarComponent } from './components/devolucoes/devolucoes-cadastrar/devolucoes-cadastrar.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProdutosDialogComponent } from './components/devolucoes/devolucoes-cadastrar/produtos-dialog/produtos-dialog.component';
import { DevolucoesListComponent } from './components/devolucoes/devolucoes-list/devolucoes-list.component';






@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    DevolucoesCadastrarComponent,
    ArmazemComponent,
    ProdutosDialogComponent,
    DevolucoesListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterModule,
    MatTableModule,
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),NbMenuModule.forRoot(),NbIconModule,
    NbLayoutModule, NbButtonModule, BrowserAnimationsModule,NbStepperModule,
    NbThemeModule.forRoot({ name: 'default' }), NbEvaIconsModule, NbCardModule,
    FormsModule,MatInputModule,NbInputModule,NbSelectModule,CommonModule,NbTreeGridModule,MatFormFieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
