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
  @Input() isPlayed: boolean = false
  @Input() selectedTrack: any


  @Output() onPauseOrPlay: EventEmitter<any> = new EventEmitter()
  @Output() onTrackChange: EventEmitter<any> = new EventEmitter()
  @Output() onIndexChange: EventEmitter<any> = new EventEmitter()



  files: Array<any> = [];
  state!: StreamState;
  currentFile: any = {};

  constructor(
    private audioService: AudioService,
    private fileService: FileService
  ) {}


  ngOnInit() {
    console.log(this.tracks)
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
        trackId: track._id,
        name: track.name,
        artists: track.album ? track.album.artists : this.album.artists, // если со страницы треков или библиотеки - то уже есть все данные, если со страницы альбомов, то получаем из входящего значения альбома артистов
        // url: this.fileService.getAudioStreamableURL(track.file) // не отображает корректно время
        url: this.fileService.getStaticSrc(track.file)

      })
    })
    // console.log(this.files)
      this.openFile(this.files[this.trackIndex], this.trackIndex)
      console.log(`OnInit`)
      console.log(this.state)

  }



  ngOnChanges() {

    if (this.files.length && !this.isPlayed && this.selectedTrack === this.state.trackId) {
      this.audioService.pause();
    } else if (this.files.length && this.isPlayed && this.selectedTrack === this.state.trackId) { // т.к. вызывается раньше ngOnInit выдает ошибку, проверяем на условие, что получены files, которые получаем только в ngOnInit
      this.audioService.play();
    } else if (this.files.length && this.isPlayed && this.selectedTrack !== this.state.trackId) { // на другой трек
      setTimeout(() => {      
        this.openFile(this.files[this.trackIndex], this.trackIndex)
      }, 100);


      // this.openFile(this.files[this.trackIndex], this.trackIndex)
      // if (this.ofPromise !== undefined) {
      //   this.ofPromise.then(() => {
      //     this.openFile(this.files[this.trackIndex], this.trackIndex)
      //   })
      // }   
    }
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
    this.onPauseOrPlay.emit()

  }

  play() {
    this.audioService.play();
    this.onPauseOrPlay.emit()
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
    this.onTrackChange.emit(file.trackId)
    this.onIndexChange.emit(index)
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
    this.onTrackChange.emit(file.trackId)
    this.onIndexChange.emit(index)
    
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
