import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { AudioPlayerComponent } from './shared/components/audio-player/audio-player.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    RegisterComponent,
    ArtistsComponent,
    TracksComponent,
    AlbumsComponent,
    AlbumPageComponent,
    AudioPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
