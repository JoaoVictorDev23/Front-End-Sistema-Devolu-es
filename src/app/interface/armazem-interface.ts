import { NotaFiscal } from "./nfd-interface";

export interface Armazem {
  id?: number; // Identificador único do armazem
  armazemNome: string;
  armazemEndereco: string;
  armazemFilial:string;
}
