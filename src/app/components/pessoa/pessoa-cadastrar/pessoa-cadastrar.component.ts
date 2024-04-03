import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Motorista } from 'src/app/interface/motorista-interface';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { CompradorService } from 'src/app/services/comprador/comprador.service';
import { MotoristaService } from 'src/app/services/motorista/motorista.service';

@Component({
  selector: 'app-pessoa-cadastrar',
  templateUrl: './pessoa-cadastrar.component.html',
  styleUrls: ['./pessoa-cadastrar.component.scss']
})
export class PessoaCadastrarComponent {

  constructor(private pessoaService: CompradorService, private motoristaService: MotoristaService,
    private toastrService: NbToastrService, private router:Router){

  }
  motorista: Motorista = {
    nome: "",
    cpf: "",
    email: ""

  }

  pessoa: Pessoa = {
    nome: "",
    cpf: "",
    email: ""


  }
  tipoPerfil: string ='';


  atualizarTipoPerfil(event: any) {
    this.tipoPerfil = event.target.value;
  }
    create() {
      if (this.tipoPerfil === '1') {
        // Chamar o endpoint para cadastrar um Cliente
        this.createComprador();
      } else if (this.tipoPerfil === '2') {
        // Chamar o endpoint para cadastrar um Motorista
        this.createMotorista();
      } else {
        // Tratar caso nenhum perfil seja selecionado
       this.toastrService.warning('Perfil não selecionado.');
      }
    }
  createComprador(){
    this.pessoaService.cadastrarpessoa(this.pessoa).subscribe(
      response =>{
        this.toastrService.success("Comprador cadastrado com sucesso!", "Sucesso");
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/pessoa']); // Navega para a rota de cadastro de armazém
          });
        }, 1000); 
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

createMotorista(){
  this.motorista.nome = this.pessoa.nome;
  this.motorista.cpf = this.pessoa.cpf;
  this.motorista.email = this.pessoa.email;

  this.motoristaService.cadastrarmotorista(this.motorista).subscribe(
    response =>{
      this.toastrService.success("Motorista cadastrado com sucesso!", "Sucesso");
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/pessoa']); // Navega para a rota de cadastro de armazém
        });
      }, 1000); 
    },
    error =>{
      if(error.error && error.error.message){
        this.toastrService.warning(error.error.message, "Erro");

      }
      else{
        this.toastrService.warning('Erro ao Cadastrar Motorista.!', "Erro");
      }
    }
  )

}

}
