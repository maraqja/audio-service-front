import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Playlist } from '../interfaces/playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${environment.apiUrl}/playlist`)
  }

  getById(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.apiUrl}/playlist/${id}`)
  }

  create(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(`${environment.apiUrl}/playlist/create`, playlist)
    .pipe(map( (response) => {
      return {
        ...playlist,
        id: response._id
      }
    }))
  }

  update(id: string, playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(`${environment.apiUrl}/playlist/${id}`, playlist)
  }

  remove(id: string): Observable<Playlist> {
    return this.http.delete(`${environment.apiUrl}/playlist/${id}`)
    .pipe(map(res => {
      return <Playlist>res
    }))
  }

  updateRecs(userId: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${environment.apiUrl}/recommender/${userId}`)
  }
}
