// produto.interface.ts

import { NotaFiscal } from "./nfd-interface";

export interface Produto {
  id?: string;
  produtoNome: string;
  produtoQuantidade: number;
  produtoValor: number;
  situacaoProduto: string;
  armazemId:number;
  numeronfd: String;
}
