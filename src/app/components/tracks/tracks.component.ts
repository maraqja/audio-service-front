import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/admin/shared/services/file.service';
import { TrackService } from 'src/app/admin/shared/services/track.service';
import { Artist } from 'src/app/shared/interfaces/artist.interface';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent {


  search = ''
  tracks: any[] = [] // any из-за ошибки в шаблоне при доступе к полю .artists.name (хз как кастануть в шаблоне)
  aSub: Subscription = new Subscription()


  constructor(
    private trackService: TrackService,
    private fileService: FileService
  ) {}

  getArtistsNames(artists: Artist[]) {
    return artists.map(artist => artist.name)
  }

  ngOnInit() {
    this.aSub = this.trackService.getAll().subscribe( (tracks) => {
      this.tracks = tracks
      // console.log(tracks)
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
