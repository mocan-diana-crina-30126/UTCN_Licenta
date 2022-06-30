import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GenresListComponent} from './genres-list.component';

const routes: Routes = [{path: '', component: GenresListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenresListRoutingModule {
}
