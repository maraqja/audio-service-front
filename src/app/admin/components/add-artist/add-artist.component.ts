import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EGenre } from 'src/app/shared/enums/genres.enum';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { requiredFileType } from 'src/app/shared/validators/required-file-type.validator';
import { ArtistService } from '../../shared/services/artist.service';
import { FileService } from '../../shared/services/file.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent {


    genres = Object.keys(EGenre).filter(x => !(parseInt(x) >= 0));
    selectedGenres = [];
    form!: FormGroup;

    constructor(
      private artistService: ArtistService,
      private fileService: FileService
      ) {}




  ngOnInit(){
      this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required, requiredFileType('image')]),
      genre: new FormControl(null, [Validators.required])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }



    this.fileService.uploadFile(this.form.value.image as File).subscribe((res: any ) => {
      console.log(res.url)
      const artist: Artist = {
        name: this.form.value.name,
        description: this.form.value.description,
        image: res.url,
        genre: this.form.value.genre
      }
      this.artistService.create(artist).subscribe((artist) => {
        console.log(artist)
        this.form.reset()
      })
    })
  }

}
