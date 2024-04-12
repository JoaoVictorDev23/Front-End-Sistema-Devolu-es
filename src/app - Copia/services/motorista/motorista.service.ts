import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthService } from '../authservice.service';
import { Motorista } from 'src/app/interface/motorista-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {
  private apiUrl = `${API_CONFIG.baseUrl}/motorista`; // Use a URL da API a partir da configuração

  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrarmotorista(motorista: Motorista): Observable<Motorista>{

    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    return this.http.post<Motorista>(this.apiUrl, motorista, { headers });

  }
}
