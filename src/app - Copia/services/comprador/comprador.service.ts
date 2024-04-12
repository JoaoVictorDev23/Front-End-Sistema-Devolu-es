import { Injectable } from '@angular/core';
import { Pessoa } from 'src/app/interface/pessoa-interface';
import { AuthService } from '../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {
  private apiUrl = `${API_CONFIG.baseUrl}/pessoa`; // Use a URL da API a partir da configuração

  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrarpessoa(pessoa: Pessoa): Observable<Pessoa>{

    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    return this.http.post<Pessoa>(this.apiUrl, pessoa, { headers });

  }
}
