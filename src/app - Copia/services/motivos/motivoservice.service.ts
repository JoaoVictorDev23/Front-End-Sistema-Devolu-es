import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Motivo } from 'src/app/interface/motivo-interface';
import { AuthService } from '../authservice.service';

@Injectable({
  providedIn: 'root'
})
export class MotivoserviceService {

  private apiUrl = `${API_CONFIG.baseUrl}/motivo/cadastrar`; // Use a URL da API a partir da configuração

  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrarMotivo(motivo: Motivo): Observable<Motivo> {
    // Verifica se o token JWT foi extraído corretamente
    if (!this.authToken) {
      throw new Error('Token JWT não encontrado.');
    }

    // Cria os headers com apenas o token JWT no header Authorization
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    console.log(headers);

    // Realiza a requisição POST com os headers configurados
    return this.http.post<Motivo>(this.apiUrl, motivo, { headers });
  }
}
