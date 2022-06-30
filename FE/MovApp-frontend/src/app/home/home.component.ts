import {Component, OnInit, HostListener} from '@angular/core';
import {Movie} from '../models/movie';
import {MovieService} from '../services/movie.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

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
  upcomingLength!: number;
  popularLength!: number;
  topRatedLength!: number;
  originalLength!: number;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
    dots: true

  };


  constructor(private movieService: MovieService, private sanitizer: DomSanitizer) {
  }


  ngOnInit(): void {
    this.subs.push(this.movieService.getTrendingMovies().subscribe(data => {
        this.trending = data;
        this.trendingLength = this.trending.length;
        console.log(this.trendingLength);

        if (this.trendingLength < 9) {
          this.sliderConfig.slidesToShow = this.trendingLength;
        } else {
          this.sliderConfig.slidesToShow = 9;
        }

      }
    ));
    this.subs.push(this.movieService.getPopularMovies().subscribe(data => {
        this.populars = data;
        this.popularLength = this.populars.length;
        console.log(this.popularLength);

        if (this.popularLength < 9) {
          this.sliderConfig.slidesToShow = this.popularLength;
        } else {
          this.sliderConfig.slidesToShow = 9;
        }

      }
    ));
    this.subs.push(this.movieService.getTopRatedMovies().subscribe(data => {
      this.topRated = data;
      this.topRatedLength = this.topRated.length;
      console.log(this.topRatedLength);

      if (this.topRatedLength < 9) {
        this.sliderConfig.slidesToShow = this.topRatedLength;
      } else {
        this.sliderConfig.slidesToShow = 9;
      }
    }));
    this.subs.push(this.movieService.getOriginalsMovies().subscribe(data => {
      this.originals = data;
      this.originalLength = this.originals.length;
      console.log(this.originalLength);

      if (this.originalLength < 9) {
        this.sliderConfig.slidesToShow = this.originalLength;
      } else {
        this.sliderConfig.slidesToShow = 9;
      }
    }));
    this.subs.push(this.movieService.getUpcomingMovies().subscribe(data => {
        this.upcoming = data;
        this.upcomingLength = this.upcoming.length;
        if (this.upcomingLength < 9) {
          this.sliderConfig.slidesToShow = this.upcomingLength;
        } else {
          this.sliderConfig.slidesToShow = 9;
        }

      }
    ));

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
