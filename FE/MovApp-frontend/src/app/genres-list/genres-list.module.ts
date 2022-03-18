import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from "@angular/material/button";

import { GenresListComponent } from './genres-list.component';
import {GenresListRoutingModule} from './genres-list-routing.module';

@NgModule({
    declarations: [GenresListComponent],
    imports: [
      CommonModule,
      GenresListRoutingModule,
      MatButtonModule    
    ]
  })
  export class GenresListModule { }