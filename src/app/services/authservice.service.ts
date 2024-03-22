import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/interface/usuario-interface';
import { API_CONFIG } from 'src/app/config/api.config';
import { Credenciais } from '../interface/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtservice: JwtHelperService = new JwtHelperService();
  private usuarioSubject = new BehaviorSubject<{ nome: string | null, perfis: string[] | null }>({ nome: null, perfis: null });

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  sucessfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
    this.updateUserData();
    console.log('Login bem-sucedido. Token:', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtservice.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.updateUserData();
    console.log('Logout realizado.');
  }

  getUsuarioLogado(): string | null {
    const token = localStorage.getItem('token');
    return token ? this.jwtservice.decodeToken(token)?.sub : null;
  }

  getUsuarioObservable() {
    return this.usuarioSubject.asObservable();
  }

  private updateUserData() {
    const token = localStorage.getItem('token');
    const decodedToken = token ? this.jwtservice.decodeToken(token) : null;

    const nome = decodedToken ? decodedToken.name : null;
    const perfis = decodedToken ? decodedToken.profiles : null;

    this.usuarioSubject.next({ nome, perfis });
  }
    // AuthService

hasPermission(allowedProfiles: string[]): boolean {
  const token = localStorage.getItem('token');
  const decodedToken = token ? this.jwtservice.decodeToken(token) : null;
  const perfis  = decodedToken ? decodedToken.profiles : [];

  return allowedProfiles.some(profile => perfis.includes(profile));
}
extractAuthToken(): string | null {
  const fullToken = localStorage.getItem('token');

  if (fullToken) {
    const startIndex = fullToken.indexOf('"token":"') + 9;
    const endIndex = fullToken.indexOf('"', startIndex);
    console.log(fullToken.substring(startIndex, endIndex));
    return fullToken.substring(startIndex, endIndex);
  } else {
    return null;
  }
}
}
