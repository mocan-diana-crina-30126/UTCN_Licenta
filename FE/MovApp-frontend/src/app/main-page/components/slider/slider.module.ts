import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from "@angular/material/button";

import {SliderComponent} from "./slider.component";
import {SliderRoutingModule} from "./slider-routing.module";

@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    SliderRoutingModule,
    MatButtonModule
  ]
})

export class SliderModule {
}
