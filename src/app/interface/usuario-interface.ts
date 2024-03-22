export interface Usuario {
  id?: string; // Ajuste o tipo conforme necessário
  name: string;
  cpf: string;
  email: string;
  senha: string;
  perfis: string[]; // Alterado para usar um array de strings para os perfis
}
