import { DadosNotasFiscais } from "./dadosnfd-interface";
import { ValoresNotaFiscal } from "./financeironfd-interface";
import { Usuario } from "./usuario-interface";

export interface NotaFiscal {
  dados: DadosNotasFiscais;
  valores: ValoresNotaFiscal;

}
