import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { EGenre } from 'src/app/shared/enums/genres.enum';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { requiredFileType } from 'src/app/shared/validators/required-file-type.validator';
import { AlbumService } from '../../shared/services/album.service';
import { ArtistService } from '../../shared/services/artist.service';
import { FileService } from '../../shared/services/file.service';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent {
  album!: Album


  genres = Object.keys(EGenre).filter(x => !(parseInt(x) >= 0));
  selectedGenres: string[] = [];
  form!: FormGroup;


  selectedArtists: any = [];
  aSub: Subscription = new Subscription()
  artists: Artist[] = []

  message: string = 'Замените необходимые данные'

  changeImage = false

  constructor(
        private albumService: AlbumService,
        private fileService: FileService,
        private artistService: ArtistService,
        private route: ActivatedRoute,
        private router: Router
  ) {}

  ngOnInit(){
    this.route.params.pipe(
    switchMap((params: Params) => { // switchMap для изменеия стрима (чтобы работаьь сразу с 2 сабскрайбами)
      return this.albumService.getById(params['id'])
    }))
    .subscribe((album: Album) => {
      this.album = album
      this.selectedGenres = this.album.genre
      this.selectedArtists = this.album.artists.map((artist) => {return artist._id})
      this.form = new FormGroup({
        title: new FormControl(album.title, [Validators.required]),
        description: new FormControl(album.description, [Validators.required]),
        image: new FormControl(null, [Validators.nullValidator, requiredFileType('image')]),
        release_date: new FormControl(album.release_date, [Validators.required]),
        genre: new FormControl(album.genre, [Validators.required]),
        artists: new FormControl(this.selectedArtists, [Validators.required]),
    })
    })

    this.aSub = this.artistService.getAll().subscribe( (artists) => {
      this.artists = artists
    })
  }

  getImage(filePath: string) {
    return this.fileService.getStaticSrc(filePath)
  }


 submit() {
    if (this.form.invalid) {
      return
    }
    if (
      this.form.value.title === this.album.title &&
      this.form.value.description === this.album.description &&
      this.form.value.image === null &&
      this.form.value.release_date === this.album.release_date &&
      this.form.value.genre === this.album.genre &&
      JSON.stringify(this.form.value.artists) == JSON.stringify(this.album.artists.map((artist) => {return artist._id}))
      // не сравниваем массивы через обычное ===, т.к. массивы под капотом являются объектами, т.е. сравниваются ссылка на объекты, а не их значения
      // приводим оба массива к строковой форме и сравниваем как строки
      ) {
        this.message = 'Ничего не изменилось'
        return
    }


    if (this.form.value.image === null) {
      const album: Album = {
        title: this.form.value.title,
        description: this.form.value.description,
        image: this.album.image,
        release_date: this.form.value.release_date,
        genre: this.form.value.genre,
        artists: this.form.value.artists
      }
      this.albumService.update(this.album._id as string, album).subscribe((album) => {
        this.router.navigate(['/admin', 'albums'])
      })
    } else {
        this.fileService.uploadFile(this.form.value.image as File).subscribe((res: any ) => {
        const album: Album = {
          title: this.form.value.title,
          description: this.form.value.description,
          image: res.url,
          release_date: this.form.value.release_date,
          genre: this.form.value.genre,
          artists: this.form.value.artists
        }
        this.albumService.update(this.album._id as string, album).subscribe((album) => {
          this.router.navigate(['/admin', 'albums'])
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
