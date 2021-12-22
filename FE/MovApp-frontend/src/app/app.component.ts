import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from './models/movie';
import { MovieService } from './services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public movies: Movie[] = [];
  sticky = false;

  constructor(private movieService: MovieService, private sanitizer: DomSanitizer){}

  ngOnInit() {
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

  public getVideoFromPath(path: string){
     return this.sanitizer.bypassSecurityTrustResourceUrl(path);

  }

}
