import { NotaFiscal } from "./nfd-interface";

export interface Armazem {
  id?: number; // Identificador único do armazem
  nome: string;
  endereco: string;
  filial:string;
  notasfiscais?: NotaFiscal[];
}
