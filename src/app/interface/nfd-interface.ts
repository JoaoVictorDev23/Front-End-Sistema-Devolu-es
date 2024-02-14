import { Produto } from "./produtos.interface";
import { Cliente } from "./cliente-interface";
import { Motorista } from "./motorista-interface";


export interface NotaFiscal {


  filial: string;
  serie: string;
  cte: string;
  numeroNfd: string;
  armazem: string;
  status: string;
  observacao: string;
  motorista: string;
  cliente: string;
  produtos: Produto[];
}
