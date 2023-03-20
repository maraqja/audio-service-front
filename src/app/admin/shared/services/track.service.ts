import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Track } from 'src/app/shared/interfaces/track.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Track[]> {
    return this.http.get<Track[]>(`${environment.apiUrl}/track`)
  }

  create(track: Track): Observable<Track> {
    return this.http.post<Track>(`${environment.apiUrl}/track/create`, track)
    .pipe(map( (response) => {
      return {
        ...track,
        id: response._id
      }
    }))
  }

  remove(id: string): Observable<Track> {
    return this.http.delete(`${environment.apiUrl}/track/${id}`)
    .pipe(map(res => {
      return <Track>res
    }))
  }

}
