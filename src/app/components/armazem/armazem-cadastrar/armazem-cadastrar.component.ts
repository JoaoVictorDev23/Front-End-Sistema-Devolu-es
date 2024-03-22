import { Armazem } from './../../../interface/armazem-interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-armazem-cadastrar',
  templateUrl: './armazem-cadastrar.component.html',
  styleUrls: ['./armazem-cadastrar.component.scss']
})
export class ArmazemCadastrarComponent {

  armazem: Armazem = {
    armazemNome: '',
    armazemEndereco: '',
    armazemFilial: ''
  }

  create(){
    console.log(this.armazem);
  }
}
