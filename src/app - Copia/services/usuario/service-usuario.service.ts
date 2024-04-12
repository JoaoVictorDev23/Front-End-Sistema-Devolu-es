import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthService } from '../authservice.service';
import { Usuario } from 'src/app/interface/usuario-interface';
import { Observable } from 'rxjs';
import { ChatMessage, Mensagems } from 'src/app/components/modals/modal-view-devolucao-correcao-gestor/modal-view-devolucao-correcao-gestor.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioService {
  private apiUrl = `${API_CONFIG.baseUrl}/usuarios`; // Use a URL da API a partir da configuração
  private apiUrl2 = `${API_CONFIG.baseUrl}/`; // Use a URL da API a partir da configuração

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

  getUserByEmail(): Observable<Usuario> {
    const headers = this.getHeaders();
    return this.http.get<Usuario>(`${this.apiUrl}/user`, { headers });
  }

  private getHeaders(): HttpHeaders {
    // Verifica se o token JWT foi extraído corretamente
    if (!this.authToken) {
      throw new Error('Token JWT não encontrado.');
    }

    // Cria os headers com apenas o token JWT no header Authorization
    return new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
  }

  createMessage(chatMessageDTO: Mensagems): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}chat`, chatMessageDTO,  { headers: this.getHeaders() });
  }

  getMessagesByNfd(nfd: String): Observable<Mensagems[]> {
    return this.http.get<Mensagems[]>(`${this.apiUrl2}chat/${nfd}` ,  { headers: this.getHeaders() });
  }

}
