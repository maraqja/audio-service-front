import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-artists-dashboard',
  templateUrl: './artists-dashboard.component.html',
  styleUrls: ['./artists-dashboard.component.css']
})
export class ArtistsDashboardComponent {
  search = ''
  artists: Artist[] = []
  aSub: Subscription = new Subscription()
  dSub: Subscription = new Subscription()

  constructor(private artistService: ArtistService) {}

  ngOnInit() {
    this.aSub = this.artistService.getAll().subscribe( (artists) => {
      this.artists = artists
    })
  }

  remove(id: any) {
    console.log(id)
    this.artistService.remove(id).subscribe(() => {
      this.artists = this.artists.filter(artist => artist._id !== id)
    })
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
