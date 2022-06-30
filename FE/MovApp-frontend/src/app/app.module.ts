import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatNativeDateModule} from "@angular/material/core";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {SlickCarouselModule} from 'node_modules/ngx-slick-carousel';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';

import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Angular Material

import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';

import {SliderComponent} from './main-page/components/slider/slider.component';
// import {SlickCarouselModule} from 'ngx-slick-carousel';

import {PipeModule} from './main-page/components/pipes/pipe.module';

//Components

import {HeaderComponent} from './header/header.component';
import {GenresComponent} from './genres/genres.component';
import {GenresListComponent} from './genres-list/genres-list.component';
import {HomeComponent} from './home/home.component';
import {ChildrenComponent} from './children/children.component';
import {HomeSliderComponent} from './home-slider/home-slider.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import {VideoComponent} from './video/video.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FavoritesListComponent} from "./favorites-list/favorites-list.component";
import {WatchLaterComponent} from './watch-later/watch-later.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {SuccessfullyDialogComponent} from './successfully-dialog/successfully-dialog.component';
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AddFormComponent} from './add-form/add-form.component';
import {EditFormComponent} from './edit-form/edit-form.component';
import {AddDialogComponent} from './add-dialog/add-dialog.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {ErrorMessageComponent} from './error-message/error-message.component';
import {DetailsComponent} from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    HomeComponent,
    HeaderComponent,
    FavoritesListComponent,
    GenresComponent,
    GenresListComponent,
    ChildrenComponent,
    HomeSliderComponent,
    SearchResultsComponent,
    VideoComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    WatchLaterComponent,
    ConfirmationDialogComponent,
    SuccessfullyDialogComponent,
    ConfirmDialogComponent,
    AddFormComponent,
    EditFormComponent,
    AddDialogComponent,
    EditDialogComponent,
    ErrorMessageComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    SlickCarouselModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatChipsModule,
    MatCardModule,
    PipeModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MdbCheckboxModule,
    MatExpansionModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, AddDialogComponent],
  schemas: []
})
export class AppModule {
}
