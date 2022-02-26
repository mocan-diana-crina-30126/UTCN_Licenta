import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
{
  path: '',
  component: AppComponent
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
