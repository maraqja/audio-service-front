import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from '../interfaces/artist.interface';

@Pipe({
  name: 'searchArtists'
})
export class SearchArtistsPipe implements PipeTransform {

  transform(artists: Artist[], search: string = ''): Artist[] {
    if (!search.trim()) {
      return artists
    }
    return artists.filter( (artist) => artist.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) );
  }

}



