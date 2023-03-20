import { Pipe, PipeTransform } from '@angular/core';
import { Album } from '../interfaces/album.interface';
import { Artist } from '../interfaces/artist.interface';

@Pipe({
  name: 'searchAlbums'
})
export class SearchAlbumsPipe implements PipeTransform {

  transform(albums: Album[], search: string = ''): any[] {
    if (!search.trim()) {
      return albums
    }

    // const artists = albums.filter(album => album.artists.some((artist:any) => artist.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))) // some проверяет, удовлетворяет ли какой-либо элемент массива артистов условию (every - все элементы массива удовлетворяют условию
    // console.log(artists)

    return albums.filter( (album) => album.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
    || album.artists.some((artist:any) => artist.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
  }

}
