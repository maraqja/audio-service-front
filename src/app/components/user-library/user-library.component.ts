import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrackService } from 'src/app/admin/shared/services/track.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent {

  search = ''
  tracks: any[] = [] // any из-за ошибки в шаблоне при доступе к полю .artists.name (хз как кастануть в шаблоне)

  constructor(
    private authService: AuthService,
    private trackService: TrackService
  ) {}


  ngOnInit() {
    this.authService.favoriteTracks.forEach((id: any) => { // идем по массиву ID фаворит треков
      this.trackService.getById(id).subscribe((track) => {
        this.tracks.push(track)
      })
    })
  }
}
