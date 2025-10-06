import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  exp: number;
  name: string;
  email:string;
  businessname: string;
  photo: string;
  userid: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginApiUrl = 'https://localhost:7118/api/Login';
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
     const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      this.userSubject.next(JSON.parse(savedUser));
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }
  }

  login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.loginApiUrl}/login`, { email, password }).pipe(
    tap((res: any) => {
      if (res && res.token) {
        localStorage.setItem('authToken', res.token);

        const userData = {
          email: res.email,
          name: res.name,
          photo: res.photo,
          businessname: res.businessname
        };

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Push to BehaviorSubject
        this.userSubject.next(userData);
      }
    })
  );
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
