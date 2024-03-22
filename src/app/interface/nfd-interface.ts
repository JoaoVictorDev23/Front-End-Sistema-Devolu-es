import { Produto } from 'src/app/interface/produtos.interface';
import { DadosNotasFiscais } from "./dadosnfd-interface";
import { ValoresNotaFiscal } from "./financeironfd-interface";
import { Usuario } from "./usuario-interface";

export interface NotaFiscal {
  dadosNfdDTO: DadosNotasFiscais;
  valoresDTO: ValoresNotaFiscal;
  produtosDTO: Produto [];

}
