import { Armazem } from "./armazem-interface";
import { Cliente } from "./cliente-interface";
import { Motorista } from "./motorista-interface";
import { Pessoa } from "./pessoa-interface";

export interface ValoresNotaFiscal {
  id?: any;
  valorVenda: number;
  valorPrejuizo: number;
  valorArmazem: number;
  situacaoValores: string;
  armazem: number;
  motorista: String;
  cliente: number;
  pessoa: string;
  numeronfd:String;
  debitadoCliente:number;
  debitadoMotorista:number;
  cadastradopor?:any;
  atualizadopor?:any;
  data:Date;
}
