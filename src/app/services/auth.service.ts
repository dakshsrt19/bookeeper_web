import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface JwtPayload {
  sub: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginApiUrl = 'https://localhost:7118/api/Login';

  constructor(private http: HttpClient) {console.log(this.isLoggedIn());}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.loginApiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('authToken', res.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeJwtPayload<JwtPayload>(token);
    if (!payload || !payload.exp) return false;

    return payload.exp * 1000 > Date.now();
  }

  private decodeJwtPayload<T = any>(token: string): T | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT');

      let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4 !== 0) {
        base64 += '=';
      }

      const decoded = atob(base64);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('JWT decode error:', e);
      return null;
    }
  }
}
