import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file:File) {
    console.log(file)
    const formParams = new FormData();
    formParams.append('file', file)
    return this.http.post(`${environment.apiUrl}/files/upload`, formParams)
  }

  getStaticSrc(filePath: string): string { // просто меняем uploads на static чтобы в теге audio/image вставить в src
    return environment.apiUrl + filePath.replace('uploads', 'static')
  }

  getDuration(file: File): Promise<any> { // В промис т.к. выдает undefined выдает, нужно создавать трек в базе, только после получения длительности аудио
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      audio.src = URL.createObjectURL(file)
      audio.onloadedmetadata = () => {
        return resolve(audio.duration)
      };
    })
  }
}
