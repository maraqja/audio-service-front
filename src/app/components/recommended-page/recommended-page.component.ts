import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/admin/shared/services/file.service';
import { Playlist } from 'src/app/shared/interfaces/playlist.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PlaylistService } from 'src/app/shared/services/playlist.service';

@Component({
  selector: 'app-recommended-page',
  templateUrl: './recommended-page.component.html',
  styleUrls: ['./recommended-page.component.css']
})
export class RecommendedPageComponent {

  playlists: Playlist[] = []
  aSub: Subscription = new Subscription()
  uSub: Subscription = new Subscription()

  selectedPlaylistId: any
  isPlayed: boolean = false
  selectedPlaylist: any


  constructor(
    private playlistService: PlaylistService,
    private fileService: FileService,
    private authService: AuthService
    ) {}

  
  ngOnInit() {
    
    this.uSub = this.playlistService.updateRecs(this.authService.getUserId()).subscribe((recs) => { // не можем просто обновить и получить, т.к. при обновлении возвращаются не populate плейлисты (без артистов итд)
      this.aSub = this.playlistService.getAll().subscribe( (playlists) => {
      playlists.forEach((playlist) => {
        if (playlist.source === 'recommender' && playlist.owner === this.authService.getUserId()) {
          this.playlists.push(playlist)
        }
      })
      console.log(this.playlists)
    })
      console.log(recs)
    })
  }




  togglePlay(playlistId: any) {
    if (this.selectedPlaylistId != playlistId) {
      this.isPlayed = false
      this.selectedPlaylist = this.playlists.find((playlist) => playlist._id === playlistId)
      // console.log('play')
    }
    this.selectedPlaylistId = playlistId
    this.isPlayed = !this.isPlayed
    // console.log(this.isPlayed, this.selectedPlaylistId)
  }

  close() {
    this.isPlayed = false
    this.selectedPlaylist = null
    this.selectedPlaylistId = null
  }

  getImgSrc(path: string) {
    return this.fileService.getStaticSrc(path)
  }
  togglePlayer() {
   this.isPlayed = !this.isPlayed
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }


}
