import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, HostListener, } from '@angular/core';
import { Movie } from './models/movie';
import { MovieService } from './services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  sticky = false;
  subs: Subscription[] = [];
  trending: Movie[] = [];
  popular: Movie[] = [];
  topRated: Movie[] = [];
  originals: Movie[] = [];
  nowPlaying: Movie[] = [];
  latest: Movie[] = [];


  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

  @ViewChild('stickHeader') header!: ElementRef;
  headerBGUrl!: string;

   public movies: Movie[] = [];


  constructor(private movieService: MovieService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {


    this.subs.push(this.movieService.getTrendingMovies().subscribe(data => {
      this.trending = data;
      //this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.trending.results[0].backdrop_path;  //poza de fundal
    }));
    this.subs.push(this.movieService.getPopularMovies().subscribe(data => this.popular = data));
    this.subs.push(this.movieService.getTopRatedMovies().subscribe(data => this.topRated = data));
    this.subs.push(this.movieService.getOriginalsMovies().subscribe(data => this.originals = data));
    this.subs.push(this.movieService.getNowPlayingMovies().subscribe(data => this.nowPlaying = data));
    this.subs.push(this.movieService.getLatestMovies().subscribe(data => this.latest = data));

     this.getMovies();
  }

  public getMovies(): void{
    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
        console.log(this.movies);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

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

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef
  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }

  }
  
  public getVideoFromPath(path: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);

}
}
