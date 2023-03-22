import { Component, Input } from '@angular/core';
import { FileService } from 'src/app/admin/shared/services/file.service';
import { Album } from '../../interfaces/album.interface';
import { Artist } from '../../interfaces/artist.interface';
import { Track } from '../../interfaces/track.interface';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {

  // страница треков
  @Input() tracks!: Track[]
  @Input() search: string = ''


  // стринца альбома
  @Input() album!: Album


  isPlayed = false;
  selectedTrack = 0;



  constructor(
    private fileService: FileService
  ) {}


  getArtistsNames(artists: Artist[] | any[]) {
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

  test() {
    console.log(this.tracks)
    console.log(this.album)
  }




}
