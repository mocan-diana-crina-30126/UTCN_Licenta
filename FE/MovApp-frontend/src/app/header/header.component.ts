import {Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {Movie} from "../models/movie";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sticky = false;
  
  genres: string [] = ['Action','Drama'];
  trending: Movie[] = [];
  searchedMovies: Movie[] = [];
  searchText='';
  movies: Movie[] = [];
  subs: Subscription[] = [];
 
  

  constructor(private movieService: MovieService,  private router: Router,
    private route: ActivatedRoute,) {
      
     }

  ngOnInit(): void {
    
  }


  @ViewChild('stickHeader') header!: ElementRef;
  headerBGUrl!: string;

  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }

  }

  getMoviesByTitle(){
    console.log(this.searchText);
    this.router.navigate(['search'], {relativeTo: this.route});
    this.subs.push(this.movieService.getMovieByTitle(this.searchText).subscribe(data => {
      this.movies = data;
      console.log('In search bar from header i searched for: ' + this.searchText);
      console.log('I got:');
      console.log(this.movies);
    }));
    this.movieService.searchedMovies.next(this.movies);


  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }


}
