import { Motivo } from "./motivo-interface";
import { Produto } from "./produtos.interface";

export interface DadosNotasFiscais{

      dadosnfdId?:any;
      numeroNfd: String;
      numeroNfo: String;

      filial: String;
      serie: String;
      cte: String;
      observacao: string;
      situacao: string;
      motivo: number;

      cadastradopor?:any;
      atualizadopor?:any;
}
