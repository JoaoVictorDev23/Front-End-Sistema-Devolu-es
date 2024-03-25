import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { Armazem } from 'src/app/interface/armazem-interface';
import { AuthService } from '../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArmazemCadastrarService {
  private apiUrl = `${API_CONFIG.baseUrl}/armazem`; // Use a URL da API a partir da configuração

  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrararmazem(armazem: Armazem): Observable<Armazem>{

    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    return this.http.post<Armazem>(this.apiUrl, armazem, { headers });

  }
  // Método para obter todas as notas fiscais
getAllarmazem(): Observable<Armazem[]> {
  return this.http.get<Armazem[]>(`${this.apiUrl}/listar`, { headers: this.getHeaders() });

}

private getHeaders(): HttpHeaders {
  // Verifica se o token JWT foi extraído corretamente
  if (!this.authToken) {
    throw new Error('Token JWT não encontrado.');
  }

  // Cria os headers com apenas o token JWT no header Authorization
  return new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
}
}
