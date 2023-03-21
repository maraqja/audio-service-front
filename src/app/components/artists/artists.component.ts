import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtistService } from 'src/app/admin/shared/services/artist.service';
import { FileService } from 'src/app/admin/shared/services/file.service';
import { Artist } from 'src/app/shared/interfaces/artist.interface';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {

  search = ''
  artists: Artist[] = []
  aSub: Subscription = new Subscription()


  constructor(
    private artistService: ArtistService,
    private fileService: FileService
    ) {}



  ngOnInit() {
    this.aSub = this.artistService.getAll().subscribe( (artists) => {
      this.artists = artists
    })
  }


  getImgSrc(path: string) {
    return this.fileService.getStaticSrc(path)
  }



  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
