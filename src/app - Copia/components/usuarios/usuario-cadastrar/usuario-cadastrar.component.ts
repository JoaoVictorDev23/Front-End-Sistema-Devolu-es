import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { Usuario } from 'src/app/interface/usuario-interface';
import { ServiceUsuarioService } from 'src/app/services/usuario/service-usuario.service';

@Component({
  selector: 'app-usuario-cadastrar',
  templateUrl: './usuario-cadastrar.component.html',
  styleUrls: ['./usuario-cadastrar.component.scss']
})
export class UsuarioCadastrarComponent {

  constructor(private usuarioService: ServiceUsuarioService,
    private toastrService: NbToastrService,private router:Router){

  }

  usuario: Usuario = {
    name: "",
    cpf: "",
    email: "",
    senha:"",
    perfis: [0]

  }

  create(){
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      response =>{
        this.toastrService.success("Usuário cadastrado com sucesso!", "Sucesso");
        this.router.navigate(['home']);

      },
      error =>{
        if(error.error && error.error.message){
          this.toastrService.warning(error.error.message, "Erro");

        }
        else{
          this.toastrService.warning('Erro ao Cadastrar Usuário.!', "Erro");
        }
      }
    )

}
}
