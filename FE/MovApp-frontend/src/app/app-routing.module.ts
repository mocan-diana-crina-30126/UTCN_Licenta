import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GenresComponent } from './genres/genres.component';
import { FavoritesListComponent } from './movies/favorites-list/favorites-list.component';
import { WatchedEditComponent } from './movies/watched-list/watched-edit/watched-edit.component';
import { WatchedListComponent } from './movies/watched-list/watched-list.component';
import { ChildrenComponent } from './children/children.component';
import { GenresListComponent } from './genres-list/genres-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
{
  path: '', redirectTo: '/home', pathMatch: 'full'},
{
path: 'home',
component: HomeComponent
},
{
  path: 'genres/:id/:name',
  component: GenresComponent
},
{ path: 'genres',
  component: GenresListComponent
},
{
  path: 'favorites',
  component: FavoritesListComponent
},
{
  path: 'watched',
  component: WatchedListComponent
},
{
  path: 'children',
  component: ChildrenComponent
},
{
  path: 'search',
  component: SearchResultsComponent
}

];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
