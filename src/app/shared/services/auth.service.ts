import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
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

  get favoriteTracks(): any {
    return JSON.parse(localStorage.getItem('favorite-tracks') || `[]`)
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
    // this.setToken(null)
    localStorage.clear()
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

  setFavoriteTracks(favoriteTracks?: string[]) { // для занесения в локал сторадж, чтобы при добавлении трека в избранное не нужно было перезаходить, чтобы он отобразился (т.к. читать будем не из токена, а и из локал стораджа и пушить в бд и туда)
    if (favoriteTracks) {
      localStorage.setItem('favorite-tracks', JSON.stringify(favoriteTracks) ) // при добавлении трека
    } else {
      localStorage.setItem('favorite-tracks', JSON.stringify(this.decodeJwt().data.favoriteTracks) ) // при логине
    }
  }


  getUserId() {
    if (!this.token) {
      return false
    }
    return this.decodeJwt().data._id
  }



  pushToFavoriteTracks(userId: string, trackId: string) {
    const lcTracks = this.favoriteTracks
    if (lcTracks.includes(trackId)) { // нельзя добавить уже добавленный трек
      return throwError(() => new Error('Already in favorite'))
    } else {
      lcTracks.push(trackId)
      this.setFavoriteTracks(lcTracks.flat())
      return this.http.put(`${environment.apiUrl}/user/${userId}/add/favorite`, { trackId })
    }
    // const tracks = [trackId] // создаем новый масссив
    // tracks.push(this.favoriteTracks) // пушим в него все треки, ранее занесенные в локал сторадж
    // this.setFavoriteTracks(tracks.flat())  // с помощью флета раскрываем подмассив, полученный с локалстораджа
    
  }
}
