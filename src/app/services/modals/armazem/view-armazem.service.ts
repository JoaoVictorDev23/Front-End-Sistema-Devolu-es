import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthService } from '../../authservice.service';
import { Armazem } from 'src/app/interface/armazem-interface';
import { Observable } from 'rxjs';
import { NotaFiscal } from 'src/app/interface/nfd-interface';

@Injectable({
  providedIn: 'root'
})
export class ViewArmazemService{
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

  getAllarmazem(armazemId: number): Observable<NotaFiscal[]> {
    const url = `${this.apiUrl}/valoresnfd/listar`;
    const headers = this.getHeaders();
    const body = { armazemId }; // Criar um objeto com o armazemId

    return this.http.post<NotaFiscal[]>(url, body, { headers });
  }
}
