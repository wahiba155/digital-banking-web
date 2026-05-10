import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(
      `${environment.backendHost}/auth/login`, null, { params }
    );
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    // ← Sauvegarder dans localStorage
    localStorage.setItem('jwt-token', this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.username = null;
    this.roles = null;
    localStorage.removeItem('jwt-token');
    this.router.navigateByUrl('/login');
  }

  // ← Charger token au démarrage
  loadJwtTokenFromLocalStorage() {
    let token = localStorage.getItem('jwt-token');
    if (token) {
      this.loadProfile({ 'access-token': token });
    }
  }
}