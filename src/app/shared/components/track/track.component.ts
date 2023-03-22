import { Component, Input } from '@angular/core';
import { FileService } from 'src/app/admin/shared/services/file.service';
import { Album } from '../../interfaces/album.interface';
import { Artist } from '../../interfaces/artist.interface';
import { Track } from '../../interfaces/track.interface';
import { AuthService } from '../../services/auth.service';
import { InteractionsService } from '../../services/interactions.service';

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

  userId: string = ''



  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private interactionsService: InteractionsService
  ) {

  }

  ngOnInit() {
    this.userId = this.authService.getUserId()
    console.log(this.userId)
  }


  getArtistsNames(artists: Artist[] | any[]) {
    return artists.map(artist => artist.name)
  }

  listen(userId: string, trackId: string) {
    this.interactionsService.listen(userId, trackId)
  }

  togglePlay(trackId: any) {
    if (this.selectedTrack != trackId) {
      this.isPlayed = false
      // console.log('play')
      this.interactionsService.listen(this.userId, trackId).subscribe()
    }
    this.selectedTrack = trackId
    this.isPlayed = !this.isPlayed
    // console.log(this.isPlayed, this.selectedTrack)
  }

  test() {
    console.log(this.tracks)
    console.log(this.album)
  }

  addToFavorites(userId: string, trackId: string) {
    this.authService.pushToFavoriteTracks(userId, trackId).subscribe((res) => {
      console.log(res)
    }, (error) => {
      console.log('THIS TRACK ALREADY IN YOUR FAVORITE LIST')
    })
  }




}
