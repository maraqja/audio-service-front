import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksDashboardComponent } from './components/tracks-dashboard/tracks-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ArtistsDashboardComponent } from './components/artists-dashboard/artists-dashboard.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { AddArtistComponent } from './components/add-artist/add-artist.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { AlbumDashboardComponent } from './components/album-dashboard/album-dashboard.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { AddTrackComponent } from './components/add-track/add-track.component';
import { EditArtistComponent } from './components/edit-artist/edit-artist.component';
import { EditAlbumComponent } from './components/edit-album/edit-album.component';


@NgModule({
  declarations: [
    TracksDashboardComponent,
    ArtistsDashboardComponent,
    AdminLayoutComponent,
    AddArtistComponent,
    FileUploadComponent,
    AlbumDashboardComponent,
    AddAlbumComponent,
    AddTrackComponent,
    EditArtistComponent,
    EditAlbumComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgSelectModule,
    SharedModule
  ]
})
export class AdminModule { }
