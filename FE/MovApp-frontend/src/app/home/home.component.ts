
import { Component,OnDestroy, OnInit, ElementRef, HostListener, Input} from '@angular/core';
import { Movie } from '../models/movie';
import {MovieService} from '../services/movie.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import { SliderComponent } from '../main-page/components/slider/slider.component';
import {SlickCarouselModule} from 'node_modules/ngx-slick-carousel';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subs: Subscription[] = [];
  trending: Movie[] = [];
  populars: Movie[] = [];
  topRated: Movie[] = [];
  originals: Movie[] = [];
  upcoming: Movie[] = [];
  public movies: Movie[] = [];
  trendingLength!: number;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
    dots: true
   
    // "responsive": [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };

  sliderConfigSearch = {
    slidesToShow: 0,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };



  constructor(private movieService: MovieService, private sanitizer: DomSanitizer, private genreService:GenreService) { }


  ngOnInit(): void {
    this.subs.push(this.movieService.getTrendingMovies().subscribe(data =>
      this.trending = data
      
      

      // this.headerBGUrl = this.trending[0].image_path;  //poza de fundal
    ));
    this.subs.push(this.movieService.getPopularMovies().subscribe(data => 
      this.populars = data
      
    ));
    this.subs.push(this.movieService.getTopRatedMovies().subscribe(data => this.topRated = data));
    this.subs.push(this.movieService.getOriginalsMovies().subscribe(data => this.originals = data));
    this.subs.push(this.movieService.getUpcomingMovies().subscribe(data => this.upcoming = data));

    //this.subs.push(this.genreService.getAllGenres().subscribe(data => {this.genres = data; console.log(this.genres);}));

    this.getMovies();
  }
  public getMovies(): void {
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
  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef


  public getVideoFromPath(path: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);

  }




}
