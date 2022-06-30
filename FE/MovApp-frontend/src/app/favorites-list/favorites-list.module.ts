import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from "@angular/material/button";

import {FavoritesListRoutingModule} from './favorites-list-routing.module'
import {FavoritesListComponent} from './favorites-list.component';

@NgModule({
  declarations: [FavoritesListComponent],
  imports: [
    CommonModule,
    FavoritesListRoutingModule,
    MatButtonModule
  ]
})
export class FavoritesListModule {
}
