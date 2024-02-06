import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
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
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    DevolucoesCadastrarComponent,
    ArmazemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterModule,
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),NbMenuModule.forRoot(),NbIconModule,
    NbLayoutModule, NbButtonModule, BrowserAnimationsModule,NbStepperModule,
    NbThemeModule.forRoot({ name: 'default' }), NbEvaIconsModule, NbCardModule,
    FormsModule,NbInputModule,NbSelectModule,CommonModule,NbTreeGridModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
