import {Component, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {GenresComponent} from './genres/genres.component';
import {FavoritesListComponent} from './favorites-list/favorites-list.component';
import {ChildrenComponent} from './children/children.component';
import {GenresListComponent} from './genres-list/genres-list.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import {VideoComponent} from './video/video.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {WatchLaterComponent} from "./watch-later/watch-later.component";

const routes: Routes = [
  {
    path: '', redirectTo: '/register', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'genres/:id/:name',
    component: GenresComponent
  },

  {
    path: 'genres',
    component: GenresListComponent
  },
  {
    path: 'favorites',
    component: FavoritesListComponent
  },
  {
    path: 'watch',
    component: WatchLaterComponent
  },
  {
    path: 'children',
    component: ChildrenComponent
  },
  {
    path: 'search',
    component: SearchResultsComponent
  },
  {
    path: 'video/:id',
    component: VideoComponent
  },
  {
    path: 'admin',
    component: BoardAdminComponent
  }

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
