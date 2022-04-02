import { Component, OnDestroy, OnInit,ElementRef,HostListener } from '@angular/core';
import {Movie} from './models/movie';
import {MovieService} from './services/movie.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

// enum AppTab {
//   HOME = 0,
//   GENRES = 1,
//   FAVORITES = 2,
//   WATCHED = 3,
//   ADD = 4
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // tab: AppTab = AppTab.HOME;
  
  private _searchedMovies: any[] = [];

  get data(): any[]{
    return this._searchedMovies;
  }

  set data(data: any[]){
    this._searchedMovies = data;
  }

  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    // private movieService: MovieService
  ) {}

  ngOnInit(): void {
    
  }

  // onChangeTab(){
  //   if(this.tab === AppTab.HOME) {
  //     this.router.navigate(['home'], {relativeTo: this.route});
  //   }
  //   else if (this.tab === AppTab.GENRES){
  //     this.router.navigate(['genres'], {relativeTo: this.route});
  //   }
  //   else if( this.tab === AppTab.FAVORITES){
  //     this.router.navigate(['favorites'], {relativeTo: this.route});
  //   }
  //   else if( this.tab === AppTab.WATCHED){
  //     this.router.navigate(['watched'], {relativeTo: this.route});
  //   }
  //}
  

  

  // public getMovieByTitle(): void {
  //   console.log(this.searchText);
  //   this.movieService.getMovieByGenre(this.searchText).subscribe(data => {
  //     console.log(data)
  //     this.trending = data
  //     this.sliderConfigSearch.slidesToShow = data.length;
  //   })
  // }

  





/// FUNCTIONEAZA SI FARA METODELE DE MAI JOS


  // public getTopRatedMovies(): void{
  //   this.movieService.getTopRatedMovies().subscribe(
  //     (response: Movie[]) => {
  //       this.movies = response;
  //       console.log(this.movies);
  //     },
  //     (error: HttpErrorResponse)=>{
  //       alert(error.message);
  //     }
  //   );
  // }
  // public getPopularMovies(): void{
  //   this.movieService.getPopularMovies().subscribe(
  //     (response: Movie[]) => {
  //       this.movies = response;
  //       console.log(this.movies);
  //     },
  //     (error: HttpErrorResponse)=>{
  //       alert(error.message);
  //     }
  //   );
  // }

  // public getLatestMovies(): void{
  //   this.movieService.getLatestMovies().subscribe(
  //     (response: Movie[]) => {
  //       this.movies = response;
  //       console.log(this.movies);
  //     },
  //     (error: HttpErrorResponse)=>{
  //       alert(error.message);
  //     }
  //   );
  // }


}
