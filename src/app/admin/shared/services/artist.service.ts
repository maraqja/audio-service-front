import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Artist[]> {
    return this.http.get<Artist[]>(`${environment.apiUrl}/artist`)
  }

  getById(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${environment.apiUrl}/artist/${id}`)
  }

  create(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${environment.apiUrl}/artist/create`, artist)
    .pipe(map( (response) => {
      return {
        ...artist,
        id: response._id
      }
    }))
  }

  update(id: string, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${environment.apiUrl}/artist/${id}`, artist)
  }

  remove(id: string) {
    return this.http.delete(`${environment.apiUrl}/artist/${id}`)
  }
  
}
