import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { EGenre } from 'src/app/shared/enums/genres.enum';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Track } from 'src/app/shared/interfaces/track.interface';
import { requiredFileType } from 'src/app/shared/validators/required-file-type.validator';
import { AlbumService } from '../../shared/services/album.service';
import { FileService } from '../../shared/services/file.service';
import { TrackService } from '../../shared/services/track.service';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.css']
})
export class EditTrackComponent {
  track!: Track

  genres = Object.keys(EGenre).filter(x => !(parseInt(x) >= 0));
  selectedGenres: string[] = [];
  form!: FormGroup;


  selectedAlbum: string = ''; // id album
  aSub: Subscription = new Subscription()
  albums!: Album[]

  message: string = 'Замените необходимые данные'


  constructor(
        private trackService: TrackService,
        private fileService: FileService,
        private albumService: AlbumService,
        private route: ActivatedRoute,
        private router: Router
    ) {}  

  ngOnInit(){
    this.route.params.pipe(
    switchMap((params: Params) => { // switchMap для изменеия стрима (чтобы работаьь сразу с 2 сабскрайбами)
      return this.trackService.getById(params['id'])
    }))
    .subscribe((track: Track) => {
      this.track = track
      this.selectedGenres = this.track.genre
      this.selectedAlbum = (<Album>this.track.album)._id as string
      this.form = new FormGroup({
        name: new FormControl(this.track.name, [Validators.required]),
        description: new FormControl(this.track.description, [Validators.required]),
        file: new FormControl(null, [Validators.nullValidator, requiredFileType('audio')]),
        genre: new FormControl(this.track.genre, [Validators.required]),
        album: new FormControl(this.track.album, [Validators.required]),
        key: new FormControl(this.track.key),
        bpm: new FormControl(this.track.bpm)

    })
    })

    this.aSub = this.albumService.getAll().subscribe( (albums) => {
      this.albums = albums
      console.log(this.albums)
    })
  }

  getAudio(filePath: string | any) {
    return this.fileService.getStaticSrc(filePath)
  }

    submit() {
    if (this.form.invalid) {
      return
    }
    if (
      this.form.value.name === this.track.name &&
       this.form.value.description === this.track.description &&
      this.form.value.file === null &&
      this.form.value.genre === this.track.genre &&
      this.form.value.album === this.track.album &&
      this.form.value.key === this.track.key &&
      this.form.value.bpm === this.track.bpm
    ) {
      this.message = 'Ничего не изменилось'
      return
    }
    console.log(this.form.value)
    if (this.form.value.file === null) {
      const track: Track = {
        name: this.form.value.name,
        description: this.form.value.description,
        duration: this.track.duration,
        file: this.track.file,
        genre: this.form.value.genre,
        album: this.form.value.album,
        key: this.form.value.key ? this.form.value.key : 'unknown',
        bpm: this.form.value.bpm ? this.form.value.bpm : 0,
      }
      console.log(track)
      this.trackService.update(this.track._id as string, track).subscribe((track) => {
        this.router.navigate(['/admin', 'tracks'])
      })
    } 
    else {
      let audioDuration = 0
      this.fileService.getDuration(this.form.value.file).then((duration:any) => {
        console.log(duration)
        audioDuration = duration
      })
      // console.log(audioDuration)
      
      this.fileService.uploadFile(this.form.value.file as File).subscribe((res: any ) => {
        const track: Track = {
          name: this.form.value.name,
          description: this.form.value.description,
          duration: audioDuration,
          file: res.url,
          genre: this.form.value.genre,
          album: this.form.value.album,
          key: this.form.value.key ? this.form.value.key : 'unknown',
          bpm: this.form.value.bpm ? this.form.value.bpm : 0,
        }
        this.trackService.update(this.track._id as string, track).subscribe((track) => {
          this.router.navigate(['/admin', 'tracks'])
        })
      })
    }



    

  }

  

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
