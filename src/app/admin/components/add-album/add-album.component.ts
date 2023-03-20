import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EGenre } from 'src/app/shared/enums/genres.enum';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { requiredFileType } from 'src/app/shared/validators/required-file-type.validator';
import { AlbumService } from '../../shared/services/album.service';
import { ArtistService } from '../../shared/services/artist.service';
import { FileService } from '../../shared/services/file.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent {
   
  genres = Object.keys(EGenre).filter(x => !(parseInt(x) >= 0));
  selectedGenres = [];
  form!: FormGroup;


  selectedArtists = [];
  aSub: Subscription = new Subscription()
  artists: Artist[] = []

  constructor(
        private albumService: AlbumService,
        private fileService: FileService,
        private artistService: ArtistService
    ) {}

  ngOnInit(){
      this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required, requiredFileType('image')]),
      release_date: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      artists: new FormControl(null, [Validators.required]),
    })
    this.aSub = this.artistService.getAll().subscribe( (artists) => {
      this.artists = artists
      console.log(this.artists)
    })
    
  }


  submit() {
    if (this.form.invalid) {
      return
    }



    this.fileService.uploadFile(this.form.value.image as File).subscribe((res: any ) => {
      const album: Album = {
        title: this.form.value.title,
        description: this.form.value.description,
        image: res.url,
        release_date: this.form.value.release_date,
        genre: this.form.value.genre,
        artists: this.form.value.artists
      }
      this.albumService.create(album).subscribe((album) => {
        console.log(album)
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
