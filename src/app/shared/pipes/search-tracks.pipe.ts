import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '../interfaces/track.interface';

@Pipe({
  name: 'searchTracks'
})
export class SearchTracksPipe implements PipeTransform {

  transform(tracks: Track[], search= ''): any[] {
    if (!search.trim()) {
      return tracks
    }
    return tracks.filter( (track: any) => track.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    || track.album.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    || track.album.artists.some((artist:any) => artist.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    )
  }

}
