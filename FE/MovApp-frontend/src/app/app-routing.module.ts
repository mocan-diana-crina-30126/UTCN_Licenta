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
import {AdminGuardGuard} from "./guards/admin-guard.guard";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {ErrorMessageComponent} from "./error-message/error-message.component";

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
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
    component: GenresComponent,
    canActivate: [AuthenticationGuard]
  },

  {
    path: 'genres',
    component: GenresListComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'favorites',
    component: FavoritesListComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'watch',
    component: WatchLaterComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'children',
    component: ChildrenComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'search',
    component: SearchResultsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'video/:id',
    component: VideoComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'admin',
    component: BoardAdminComponent,
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'error',
    component: ErrorMessageComponent
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
