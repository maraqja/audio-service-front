import { Component } from '@angular/core';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent {

  isPlayed = false;
  selectedTrack = 0;

  togglePlay(id: any) {
    if (this.selectedTrack != id) {
      this.isPlayed = false
    }
    this.selectedTrack = id
    this.isPlayed = !this.isPlayed
    console.log(this.isPlayed, this.selectedTrack)
  }

}
