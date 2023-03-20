import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EGenre } from 'src/app/shared/enums/genres.enum';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { requiredFileType } from 'src/app/shared/validators/required-file-type.validator';
import { ArtistService } from '../../shared/services/artist.service';
import { FileService } from '../../shared/services/file.service';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent {

  artist!: Artist;

  genres = Object.keys(EGenre).filter(x => !(parseInt(x) >= 0));
  selectedGenres: string[] = [];
  form!: FormGroup


  message: string = 'Замените необходимые данные'

  changeImage = false

  constructor(
    private artistService: ArtistService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }


  ngOnInit(){
  this.route.params.pipe(
    switchMap((params: Params) => { // switchMap для изменеия стрима (чтобы работаьь сразу с 2 сабскрайбами)
      return this.artistService.getById(params['id'])
    }))
    .subscribe((artist: Artist) => {
      this.artist = artist
      this.selectedGenres = this.artist.genre
      console.log(this.artist)
      this.form = new FormGroup({
        name: new FormControl(artist.name, [Validators.required]),
        description: new FormControl(artist.description, [Validators.required]),
        image: new FormControl(null, [Validators.nullValidator, requiredFileType('image')]), // nullValidotor для того чтобы засунуть в массив только кастомный валидатор
        genre: new FormControl(artist.genre, [Validators.required]),
      })
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
      this.form.value.name === this.artist.name &&
      this.form.value.description === this.artist.description &&
      this.form.value.genre === this.artist.genre &&
      this.form.value.image === null) {
        this.message = 'Ничего не изменилось'
        return
    }


    if (this.form.value.image === null) {
      const artist: Artist = {
        name: this.form.value.name,
        description: this.form.value.description,
        image: this.artist.image,
        genre: this.form.value.genre
      }
      this.artistService.update(this.artist._id as string, artist).subscribe((artist) => {
        this.router.navigate(['/admin', 'artists'])
      })
    } else {
      this.fileService.uploadFile(this.form.value.image as File).subscribe((res: any ) => {
      console.log(res.url)
      const artist: Artist = {
        name: this.form.value.name,
        description: this.form.value.description,
        image: res.url,
        genre: this.form.value.genre
      }
      this.artistService.update(this.artist._id as string, artist).subscribe((artist) => {
        this.router.navigate(['/admin', 'artists'])
      })
    })
    }

    
  }

}
