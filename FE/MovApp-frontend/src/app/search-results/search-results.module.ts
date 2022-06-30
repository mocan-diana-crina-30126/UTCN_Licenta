import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from "@angular/material/button";

import {SearchResultsComponent} from './search-results.component';
import {SearchResultsRoutingModule} from './search-results-routing.module';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    MatButtonModule
  ]
})

export class SliderModule {
}
