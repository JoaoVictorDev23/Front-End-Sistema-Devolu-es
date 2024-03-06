import { DadosNotasFiscais } from "./dadosnfd-interface";
import { ValoresNotaFiscal } from "./financeironfd-interface";

export interface NotaFiscal {
  dados: DadosNotasFiscais;
  valores: ValoresNotaFiscal;
}
