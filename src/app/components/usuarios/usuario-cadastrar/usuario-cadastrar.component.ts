import { Component } from '@angular/core';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { Usuario } from 'src/app/interface/usuario-interface';

@Component({
  selector: 'app-usuario-cadastrar',
  templateUrl: './usuario-cadastrar.component.html',
  styleUrls: ['./usuario-cadastrar.component.scss']
})
export class UsuarioCadastrarComponent {

  usuario: Usuario = {
    nome: "",
    cpf: "",
    email: "",
    senha:"",
    perfil: ""
  }

  create(){
    console.log(this.usuario);
  }

}
