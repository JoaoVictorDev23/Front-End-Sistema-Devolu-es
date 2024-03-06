import { Motivo } from "./motivo-interface";
import { Produto } from "./produtos.interface";

export interface DadosNotasFiscais{

      id?:any;
      numeroNfd: number;
      filial: number;
      serie: number;
      cte: number;
      numeroNfo: number;
      observacao: string;
      situacao: string;
      motivo: Motivo;
      produtos: Produto[];
}
