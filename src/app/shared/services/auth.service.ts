import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user.interface';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return <string>localStorage.getItem('jwt-token')
  }

  createUser(user: Pick<User, 'username' | 'email' | 'password'>): Observable<unknown> {
    return this.http.post(`${environment.apiUrl}/user/register`, user)
  }

  login(user: Pick<User, 'username' | 'password'>): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, user)
    .pipe(
      tap(this.setToken)
    )
  }

  logout() {
    this.setToken(null)
  }

  isAuth() {
    return !!this.token
  }

  isAdmin() {
    if (!this.token) {
      return false
    }
    return this.decodeJwt().data.role.includes('admin')
  }
    
  setToken(response: any) {
    // const decoded_jwt: any = jwt_decode(response.access_token)
    // console.log(decoded_jwt.data.role.includes('admin'))
    // console.log(response)
    if (response) {
      localStorage.setItem('jwt-token', response.access_token as string)
    } else {
      localStorage.clear()
    }
  }

  decodeJwt(): any {
    return jwt_decode(this.token)
  }

}
