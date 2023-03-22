import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { AlbumService } from 'src/app/admin/shared/services/album.service';
import { FileService } from 'src/app/admin/shared/services/file.service';
import { TrackService } from 'src/app/admin/shared/services/track.service';
import { Album } from 'src/app/shared/interfaces/album.interface';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  search = ''
  albums: any[] = [] // any из-за ошибки в шаблоне при доступе к полю .artists.name (хз как кастануть в шаблоне)
  aSub: Subscription = new Subscription()


  constructor(
    private albumService: AlbumService,
    private fileService: FileService,
    private trackService: TrackService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    
    this.aSub = this.albumService.getAll().subscribe( (albums: Album[]) => { // по сути отсюда вытаскиваем айдишники
      
      albums.forEach((album) => { // тут получаем развернутую инфу по альбомам (т.е. с треками, т.к. исполнители были итак доступны) и используем ее
          this.trackService.getTracksByAlbumId(album._id as string).subscribe((albumExtended: any) => {
            console.log(albumExtended[0]) // чет приходит ответ в виде массива, хотя должен в виде объекта простого
            this.albums.push(albumExtended[0])
          })
      })
    })
    console.log(this.albums)
    this.route.queryParams
    .pipe(delay(100)) // дилей для того чтобы успели прогрузиться все альбомы, после чего с помощью 2-way байндинга мы могли их отфильтровать (в ином случае просто query добавляется в поисковую строку, но не фильтруются альбомы)
    .subscribe((query) => {
      if (query) {
        // setTimeout(() => {
            this.search = query['artist']
        // }, 2000)

    }
    })


  }



  getImgSrc(path: string) {
    return this.fileService.getStaticSrc(path)
  }

  // getTracksCount(album_id: string) {
  //   this.trackService.getByAlbumId(album_id).subscribe((tracks) => {
  //     return tracks.length
  //   })
  // }



    ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }  


}
