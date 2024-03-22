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
    return this.http.get<Armazem[]>(`${this.apiUrl}/armazens`, { headers: this.getHeaders() });
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

// Método para obter todas as notas fiscais
getAllNotasFiscais(): Observable<NotaFiscal[]> {
  return this.http.get<NotaFiscal[]>(`${this.apiUrl}/nota/listar`, { headers: this.getHeaders() })
    .pipe(
      tap(data => {
        console.log('Dados recebidos do backend:', data);
      })
    );
}
}
