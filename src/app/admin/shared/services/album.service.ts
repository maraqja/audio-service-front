import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.apiUrl}/album`)
  }

  create(album: Album): Observable<Album> {
    return this.http.post<Album>(`${environment.apiUrl}/album/create`, album)
    .pipe(map( (response) => {
      return {
        ...album,
        id: response._id
      }
    }))
  }

  remove(id: string): Observable<Album> {
    return this.http.delete(`${environment.apiUrl}/album/${id}`)
    .pipe(map(res => {
      return <Album>res
    }))
  }
}
