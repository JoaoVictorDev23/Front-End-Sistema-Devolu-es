// produto.interface.ts

import { NotaFiscal } from "./nfd-interface";

export interface Produto {
  id?: string;
  nome: string;
  quantidade: number;
  valor: number;
  situacao: string;
  armazem:number;
  numeronfd: NotaFiscal['numeroNfd'];  // Corrigir esta linha
}
