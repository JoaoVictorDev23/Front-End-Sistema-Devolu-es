import { Produto } from "./produtos.interface";
import { Cliente } from "./cliente-interface";
import { Motorista } from "./motorista-interface";
import { Armazem } from "./armazem-interface";
import { Motivo } from "./motivo-interface";
import { Comprador } from "./comprador-interface";


export interface NotaFiscal {


  filial: number;
  serie: number;
  cte: number;
  numeroNfd: number;
  numeroNfo:number;

  observacao: string;

  valorVenda: number;
  valorPrejuizo:number;
  valorArmazem:number;

  motivo:Motivo,
  armazem: Armazem;
  motorista: Motorista;
  cliente: Cliente;
  comprador: Comprador;
  produtos: Produto[];
}
