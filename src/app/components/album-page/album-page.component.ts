import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { AlbumService } from 'src/app/admin/shared/services/album.service';
import { FileService } from 'src/app/admin/shared/services/file.service';
import { TrackService } from 'src/app/admin/shared/services/track.service';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent {
  isPlayed = false;
  selectedTrack = 0;


  album: any // any, т.к. это расширенная версия альбома с треками (конечно лучше бы для этого отдельный интерфейс)

  constructor(
    private fileService: FileService,
    private trackService: TrackService,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.route.params.pipe(
    switchMap((params: Params) => { // switchMap для изменеия стрима (чтобы работаьь сразу с 2 сабскрайбами)
      // console.log(params['id'])
      return this.trackService.getTracksByAlbumId(params['id'])
    }))
    .subscribe((album: any) => {
      this.album = album[0] // т.к. с бека в виде массива приходит
      console.log(this.album) 
    })
  }


  getImage(filePath: string) {
    return this.fileService.getStaticSrc(filePath)
  }

  getArtistsNames(artists: Artist[]) {
    return artists.map(artist => artist.name)
  }


  togglePlay(id: any) {
    if (this.selectedTrack != id) {
      this.isPlayed = false
    }
    this.selectedTrack = id
    this.isPlayed = !this.isPlayed
    console.log(this.isPlayed, this.selectedTrack)
  }

}
