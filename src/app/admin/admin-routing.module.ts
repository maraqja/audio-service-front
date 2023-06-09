import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "../shared/components/main-layout/main-layout.component";
import { AdminGuard } from "../shared/guards/admin.guard";
import { AddAlbumComponent } from "./components/add-album/add-album.component";
import { AddArtistComponent } from "./components/add-artist/add-artist.component";
import { AddTrackComponent } from "./components/add-track/add-track.component";
import { AlbumDashboardComponent } from "./components/album-dashboard/album-dashboard.component";
import { ArtistsDashboardComponent } from "./components/artists-dashboard/artists-dashboard.component";
import { EditAlbumComponent } from "./components/edit-album/edit-album.component";
import { EditArtistComponent } from "./components/edit-artist/edit-artist.component";
import { EditTrackComponent } from "./components/edit-track/edit-track.component";
import { TracksDashboardComponent } from "./components/tracks-dashboard/tracks-dashboard.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";

const routes: Routes = [{
    path: '', component: AdminLayoutComponent, canActivate: [AdminGuard], children: [
      {path: '', redirectTo: 'tracks', pathMatch: 'full'},
      {path: 'artists', component: ArtistsDashboardComponent},
      {path: 'artists/add', component: AddArtistComponent},
      {path: 'artists/:id/edit', component: EditArtistComponent},
      {path: 'albums', component: AlbumDashboardComponent},
      {path: 'albums/add', component: AddAlbumComponent},
      {path: 'albums/:id/edit', component: EditAlbumComponent},
      {path: 'tracks', component: TracksDashboardComponent},
      {path: 'tracks/add', component: AddTrackComponent},
      {path: 'tracks/:id/edit', component: EditTrackComponent}
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }