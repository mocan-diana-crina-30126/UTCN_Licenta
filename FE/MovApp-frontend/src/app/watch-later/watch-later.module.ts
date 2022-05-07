import { NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {MatButtonModule} from "@angular/material/button";

import {WatchLaterRoutingModule} from "./watch-later-routing.module";
import {WatchLaterComponent} from "./watch-later.component";

@NgModule({
  declarations: [WatchLaterComponent],
  imports: [
    CommonModule,
    WatchLaterRoutingModule,
    MatButtonModule
  ]
})

export class WatchLaterModule { }
