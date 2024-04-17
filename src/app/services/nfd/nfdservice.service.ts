import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Armazem } from 'src/app/interface/armazem-interface';
import { Cliente } from 'src/app/interface/cliente-interface';
import { Motivo } from 'src/app/interface/motivo-interface';
import { Motorista } from 'src/app/interface/motorista-interface';
import { NotaFiscal } from 'src/app/interface/nfd-interface';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { AuthService } from '../authservice.service';
import { ValoresNotaFiscal } from 'src/app/interface/financeironfd-interface';
import { DadosNotasFiscais } from 'src/app/interface/dadosnfd-interface';
import { Produto } from 'src/app/interface/produtos.interface';

@Injectable({
  providedIn: 'root'
})
export class NfdserviceService {
  private apiUrl = API_CONFIG.baseUrl; // Use a URL da API a partir da configuração
  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authToken = this.authService.extractAuthToken();
  }

  private getHeaders(): HttpHeaders {
    // Verifica se o token JWT foi extraído corretamente
    if (!this.authToken) {
      throw new Error('Token JWT não encontrado.');
    }

    // Cria os headers com apenas o token JWT no header Authorization
    return new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/cliente/buscar`, { headers: this.getHeaders() });
  }

  getMotoristas(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(`${this.apiUrl}/motorista/listar`, { headers: this.getHeaders() });
  }

  getArmazens(): Observable<Armazem[]> {
    return this.http.get<Armazem[]>(`${this.apiUrl}/armazem/listar`, { headers: this.getHeaders() });
  }

  getCompradores(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.apiUrl}/pessoa/listar`, { headers: this.getHeaders() });
  }

  getMotivos(): Observable<Motivo[]> {
    return this.http.get<Motivo[]>(`${this.apiUrl}/motivo/buscar`, { headers: this.getHeaders() });
  }

  cadastrarNotaFiscal(notaFiscal: NotaFiscal): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/nota/criar`, notaFiscal, { headers: this.getHeaders() });
  }

  // Método para obter todas as notas fiscais de acordo com usuario logado
  getAllNotasFiscais(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(`${this.apiUrl}/nota/listar`, { headers: this.getHeaders() });

  }

  //Metodo para obter todas independente.
  getAllNotasFiscaisByAll(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(`${this.apiUrl}/nota/listar/todas`, { headers: this.getHeaders() });

  }
  findByCliente(id: Number): Observable<Cliente> {
    const headers = this.getHeaders();
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/${id}`, { headers });
  }
  findByMotorista(id: String): Observable<Motorista> {
    const headers = this.getHeaders();
    return this.http.get<Motorista>(`${this.apiUrl}/motorista/${id}`, { headers });
  }
  findByPessoa(id: String): Observable<Pessoa> {
    const headers = this.getHeaders();
    return this.http.get<Pessoa>(`${this.apiUrl}/pessoa/${id}`, { headers });
  }
  findByMotivo(id: Number): Observable<Motivo> {
    const headers = this.getHeaders();
    return this.http.get<Motivo>(`${this.apiUrl}/motivo/${id}`, { headers });
  }
  updateSituacao(id: string, situacao: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/nfd/dados/${id}`, situacao, { headers: this.getHeaders() });
  }
  updateSituacaoValores(id: string, situacao: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/valoresnfd/${id}`, situacao, { headers: this.getHeaders() });
  }

  updateValores(valoresNFDDTO: ValoresNotaFiscal) {
    console.log(valoresNFDDTO);
    return this.http.put(`${this.apiUrl}/valoresnfd/update/${valoresNFDDTO.id}`, valoresNFDDTO, { headers: this.getHeaders() });
  }

  updateDados(DadosDto: DadosNotasFiscais) {
    return this.http.put(`${this.apiUrl}/nfd/dados/update/${DadosDto.dadosnfdId}`, DadosDto, { headers: this.getHeaders() });
  }
  updateProdutos(ProdutosDto: Produto[]) {
    return this.http.put(`${this.apiUrl}/produtos/atualizar`, ProdutosDto, { headers: this.getHeaders() });
  }
  //service para upload de arquivos:
  uploadFiles(files: FileList, numeroNfd: string): Observable<any> {


    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    formData.append('numeroNfd', numeroNfd);

    const url = `${this.apiUrl}/nfd/dados/upload`; // Endpoint no backend para o upload
    const headers = this.getHeaders(); // Obtenha os headers de autenticação aqui

    return this.http.post(url, formData, { headers: headers });
  }

// Service para baixar o arquivo zipado
downloadFile(numeroNfd: string): Observable<any> {
  const headers = this.getHeaders();
  const url = `${this.apiUrl}/nfd/dados/download/${numeroNfd}`;

  return this.http.get(url, {
    headers: this.getHeaders(),
    responseType: 'blob' // Espera uma resposta do tipo Blob (arquivo binário)
  });
}
gerarExcel(nomeArquivo: string): Observable<ArrayBuffer> { // Corrigindo o tipo de retorno para Observable<ArrayBuffer>
  const url = `${this.apiUrl}/nota/gerar-excel?nomeArquivo=${nomeArquivo}`;
  const headers = this.getHeaders();
  return this.http.post(url, { nomeArquivo }, {
    headers,
    responseType: 'arraybuffer' // Não é necessário 'as json' aqui
  });
}




}
