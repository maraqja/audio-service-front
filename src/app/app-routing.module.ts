import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RecommendedPageComponent } from './components/recommended-page/recommended-page.component';
import { RegisterComponent } from './components/register/register.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { UserLibraryComponent } from './components/user-library/user-library.component';
import { AudioPlayerComponent } from './shared/components/audio-player/audio-player.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnauthGuard } from './shared/guards/unauth.guard';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: HomePageComponent},
    {path: 'register', component: RegisterComponent, canActivate: [UnauthGuard]}, // можно только неавторизованным туда
    {path: 'login', component: LoginComponent, canActivate: [UnauthGuard]},
    {path: 'artists', component: ArtistsComponent, canActivate: [AuthGuard]},
    {path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard]},
    {path: 'albums/:id', component: AlbumPageComponent, canActivate: [AuthGuard]},
    {path: 'tracks', component: TracksComponent, canActivate: [AuthGuard]},
    {path: 'user_library', component: UserLibraryComponent, canActivate: [AuthGuard]},
    {path: 'recomended', component: RecommendedPageComponent, canActivate: [AuthGuard]},
    {
      path:'admin', loadChildren:  () => import('./admin/admin.module').then(x => x.AdminModule) 
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
