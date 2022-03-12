import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

 import {SlickCarouselModule} from 'node_modules/ngx-slick-carousel';

 import { HttpClientModule } from '@angular/common/http';

 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material

import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from "@angular/material/chips";
import { MatCardModule} from '@angular/material/card';

import { SliderComponent } from './main-page/components/slider/slider.component';
import { FooterComponent } from './main-page/components/footer/footer.component';
// import {SlickCarouselModule} from 'ngx-slick-carousel';

import { FilterPipe } from './main-page/components/pipes/filter.pipe';

//Components

import { HeaderComponent } from './header/header.component';
import { FavoritesListComponent } from './movies/favorites-list/favorites-list.component';
import { MoviesComponent } from './movies/movies.component';
import { WatchedListComponent } from './movies/watched-list/watched-list.component';
import { GenresComponent } from './genres/genres.component';
import { GenresListComponent } from './genres/genres-list/genres-list.component';
import { HomeComponent } from './home/home.component';
import { FavoritesEditComponent } from './movies/favorites-list/favorites-edit/favorites-edit.component';
import { WatchedEditComponent } from './movies/watched-list/watched-edit/watched-edit.component';
import { ChildrenComponent } from './children/children.component';
import { CardsComponent } from './cards/cards.component';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    FooterComponent,
    HomeComponent,
    FilterPipe,
    HeaderComponent,
    MoviesComponent,
    FavoritesListComponent,
    WatchedListComponent,
    GenresComponent,
    GenresListComponent,
    FavoritesEditComponent,
    WatchedEditComponent,
    ChildrenComponent,
    CardsComponent

  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatBadgeModule,
        SlickCarouselModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatChipsModule,
        MatCardModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
