import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Cliente } from 'src/app/interface/cliente-interface';
import { ClienteService } from 'src/app/services/clientes/cliente.service';

@Component({
  selector: 'app-cliente-cadastrar',
  templateUrl: './cliente-cadastrar.component.html',
  styleUrls: ['./cliente-cadastrar.component.scss']
})
export class ClienteCadastrarComponent {

  constructor(private clienteService: ClienteService,
    private toastrService: NbToastrService){

  }


  cliente: Cliente = {
    nome: "",
    cnpj: "",
  }
  create(){
    this.clienteService.cadastrarcliente(this.cliente).subscribe(
      response =>{
        this.toastrService.success("Comprador cadastrado com sucesso!", "Sucesso");
        
      },
      error =>{
        if(error.error && error.error.message){
          this.toastrService.warning(error.error.message, "Erro");
        }
        else{
          this.toastrService.warning('Erro ao Cadastrar Comprador.!', "Erro");
        }
      }
    )

}



}
