import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from 'src/app/admin/shared/services/file.service';
import { Album } from '../../interfaces/album.interface';
import { StreamState } from '../../interfaces/stream-state.interface';
import { Track } from '../../interfaces/track.interface';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent {

  @Input() tracks: Track[] = []
  @Input() album!: Album // если переход со страницы альбома
  @Input() trackIndex: number = 0; // номер трека в массиве треков, с которого стартовать






  files: Array<any> = [];
  state!: StreamState;
  currentFile: any = {};

  constructor(
    private audioService: AudioService,
    private fileService: FileService
  ) {}


  ngOnInit() {
    // console.log(this.album.artists)

    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
      // console.log(this.state)
    });
    this.tracks.forEach((track) => {
      // console.log(track.album)
      // console.log(this.album.artists)
      this.files.push({
        name: track.name,
        artists: track.album ? track.album.artists : this.album.artists, // если со страницы треков или библиотеки - то уже есть все данные, если со страницы альбомов, то получаем из входящего значения альбома артистов
        // url: this.fileService.getAudioStreamableURL(track.file) // не отображает корректно время
        url: this.fileService.getStaticSrc(track.file)
      })
    })
    // console.log(this.files)
    this.openFile(this.files[this.trackIndex], this.trackIndex)
  }



  playStream(url: any) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file: any, index: any) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file);
  }

  pause() {
    this.audioService.pause();

  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change: any) {
    console.log(change.target.value)
    this.audioService.seekTo(change.target.value);
  }

}
