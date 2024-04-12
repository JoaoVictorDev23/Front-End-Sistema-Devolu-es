export interface Usuario {
  id?: string; // Ajuste o tipo conforme necessário
  name: string;
  cpf: string;
  email: string;
  senha: string;
  perfis: number[]; // Usando um array de números para os perfis
}
