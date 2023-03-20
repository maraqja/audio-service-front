import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { AlbumService } from '../../shared/services/album.service';

@Component({
  selector: 'app-album-dashboard',
  templateUrl: './album-dashboard.component.html',
  styleUrls: ['./album-dashboard.component.css']
})
export class AlbumDashboardComponent {
  search = ''
  albums: any[] = [] // any из-за ошибки в шаблоне при доступе к полю .artists.name (хз как кастануть в шаблоне)
  aSub: Subscription = new Subscription()
  dSub: Subscription = new Subscription()

  constructor(private albumService: AlbumService) {}

  ngOnInit() {
    this.aSub = this.albumService.getAll().subscribe( (albums) => {
      this.albums = albums
      console.log(this.albums)
    })

  }


  remove(id: any) {
    this.dSub = this.albumService.remove(id).subscribe(() => {
      this.albums = this.albums.filter(albums => albums._id !== id)
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
