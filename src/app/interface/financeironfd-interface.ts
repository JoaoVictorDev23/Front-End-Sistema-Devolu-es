import { Armazem } from "./armazem-interface";
import { Cliente } from "./cliente-interface";
import { Comprador } from "./comprador-interface";
import { Motorista } from "./motorista-interface";
import { NotaFiscal } from "./nfd-interface";

export interface ValoresNotaFiscal {
  id?: any;
  valorVenda: number;
  valorPrejuizo: number;
  valorArmazem: number;
  situacao: string;
  armazem: Armazem;
  motorista: Motorista;
  cliente: Cliente;
  comprador: Comprador;
}
