import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesListRoutingModule } from './favorites-list-routing.module'
import { FavoritesListComponent } from './favorites-list.component';

@NgModule({
  declarations: [FavoritesListComponent],
  imports: [
    CommonModule,
    FavoritesListRoutingModule
  ]
})
export class GenresModule { }
