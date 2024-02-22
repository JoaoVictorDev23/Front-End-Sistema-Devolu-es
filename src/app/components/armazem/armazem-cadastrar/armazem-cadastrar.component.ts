import { Armazem } from './../../../interface/armazem-interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-armazem-cadastrar',
  templateUrl: './armazem-cadastrar.component.html',
  styleUrls: ['./armazem-cadastrar.component.scss']
})
export class ArmazemCadastrarComponent {

  armazem: Armazem = {
    nome: '',
    endereco: '',
    filial: ''
  }

  create(){
    console.log(this.armazem);
  }
}
