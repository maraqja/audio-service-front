import { NgModule } from "@angular/core";
import { SearchArtistsPipe } from './pipes/search-artists.pipe';
import { SearchAlbumsPipe } from './pipes/search-albums.pipe';
import { SearchTracksPipe } from './pipes/search-tracks.pipe';

@NgModule({
    declarations: [
      SearchArtistsPipe,
      SearchAlbumsPipe,
      SearchTracksPipe
    ],
    imports: [],
    exports: [SearchArtistsPipe, SearchAlbumsPipe, SearchTracksPipe],

})
// это модуль, который несет в себе общие элементы для всего приложения (например httpclient нужен и в админ модуле и в обычном)
export class SharedModule {

}