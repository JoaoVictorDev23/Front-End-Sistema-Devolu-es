import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthService } from '../authservice.service';
import { Usuario } from 'src/app/interface/usuario-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioService {
  private apiUrl = `${API_CONFIG.baseUrl}/usuarios`; // Use a URL da API a partir da configuração

  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario>{

    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    return this.http.post<Usuario>(this.apiUrl, usuario, { headers });

  }
}
