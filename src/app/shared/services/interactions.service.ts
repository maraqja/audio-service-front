import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor(private http: HttpClient) { }

  listen(userId: string, trackId: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('trackId',trackId);
    return this.http.post(`${environment.apiUrl}/interactions/${userId}/listen`,{}, {params: queryParams}) // вторым аргументом передаем пустое тело запроса, т.к. нужно только query
  }
}
