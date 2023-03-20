import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EGenre } from 'src/app/shared/enums/genres.enum';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Track } from 'src/app/shared/interfaces/track.interface';
import { requiredFileType } from 'src/app/shared/validators/required-file-type.validator';
import { AlbumService } from '../../shared/services/album.service';
import { FileService } from '../../shared/services/file.service';
import { TrackService } from '../../shared/services/track.service';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.css']
})
export class AddTrackComponent {

  genres = Object.keys(EGenre).filter(x => !(parseInt(x) >= 0));
  selectedGenres = [];
  form!: FormGroup;


  selectedAlbum: string = ''; // id album
  aSub: Subscription = new Subscription()
  albums!: Album[]


  constructor(
        private trackService: TrackService,
        private fileService: FileService,
        private albumService: AlbumService
    ) {}

  ngOnInit(){
      this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      release_date: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required, requiredFileType('audio')]),
      genre: new FormControl(null, [Validators.required]),
      album: new FormControl(null, [Validators.required]),
      bpm: new FormControl(null),
      key: new FormControl(null)
    })
    this.aSub = this.albumService.getAll().subscribe( (albums) => {
      this.albums = albums
      console.log(this.albums)
    })
  }

    submit() {
    if (this.form.invalid) {
      return
    }
    
    let audioDuration = 0
    this.fileService.getDuration(this.form.value.file).then((duration:any) => {
      console.log(duration)
      audioDuration = duration
    })
    // console.log(audioDuration)
    
    this.fileService.uploadFile(this.form.value.file as File).subscribe((res: any ) => {
      const track: Track = {
        name: this.form.value.name,
        duration: audioDuration,
        file: res.url,
        release_date: this.form.value.release_date,
        genre: this.form.value.genre,
        album: this.form.value.album,
        key: this.form.value.key ? this.form.value.key : 'unknown',
        bpm: this.form.value.bpm ? this.form.value.bpm : 0,
      }
      console.log(track)
      this.trackService.create(track).subscribe((track) => {
        console.log(track)
        this.form.reset()
      })
    })
  }

  

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }





}
