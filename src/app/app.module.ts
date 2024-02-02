import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule } from '@nebular/theme';
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbMenuModule, NbSelectModule  } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbStepperModule} from '@nebular/theme'
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme'
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DevolucoesCadastrarComponent } from './components/devolucoes/devolucoes-cadastrar/devolucoes-cadastrar.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    DevolucoesCadastrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterModule,
    NbSidebarModule.forRoot(),NbMenuModule.forRoot(),
    NbLayoutModule, NbButtonModule, BrowserAnimationsModule,NbStepperModule,
    NbThemeModule.forRoot({ name: 'default' }), NbEvaIconsModule, NbCardModule,
    FormsModule,NbInputModule,NbSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
