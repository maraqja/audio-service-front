import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from '../../shared/services/file.service';
import { TrackService } from '../../shared/services/track.service';

@Component({
  selector: 'app-tracks-dashboard',
  templateUrl: './tracks-dashboard.component.html',
  styleUrls: ['./tracks-dashboard.component.css']
})
export class TracksDashboardComponent {

  search = ''
  tracks: any[] = [] // any из-за ошибки в шаблоне при доступе к полю .artists.name (хз как кастануть в шаблоне)
  aSub: Subscription = new Subscription()
  dSub: Subscription = new Subscription()
  

  constructor(
    private trackService: TrackService,
    private fileService: FileService
    ) {}

  ngOnInit() {
    this.aSub = this.trackService.getAll().subscribe( (tracks) => {
      this.tracks = tracks
      console.log(tracks)
    })
  }


  

  remove(id: any) {
    this.dSub = this.trackService.remove(id).subscribe(() => {
      this.tracks = this.tracks.filter(track => track._id !== id)
    })
  }

  getAudio(filePath: string) {
    return this.fileService.getStaticSrc(filePath)
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }


  }
}
