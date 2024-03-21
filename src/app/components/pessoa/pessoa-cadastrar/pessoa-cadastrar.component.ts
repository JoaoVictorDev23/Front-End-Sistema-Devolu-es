import { Component } from '@angular/core';
import { Pessoa } from 'src/app/interface/pessoa-interface';

@Component({
  selector: 'app-pessoa-cadastrar',
  templateUrl: './pessoa-cadastrar.component.html',
  styleUrls: ['./pessoa-cadastrar.component.scss']
})
export class PessoaCadastrarComponent {

  pessoa: Pessoa = {
    nome: "",
    cpf: "0",
    email: "",
    perfil: ""



  }

  create(){
    console.log(this.pessoa);
  }

}
