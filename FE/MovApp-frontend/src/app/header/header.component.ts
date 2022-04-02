import {Component, ElementRef, EventEmitter,HostListener,Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {Movie} from "../models/movie";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sticky = false;
  
  genres: string [] = ['Action','Drama'];
  trending: Movie[] = [];
  @Output() searchedMovies: EventEmitter<any> = new EventEmitter<any>();
  searchText='';
  movies: Movie[] = [];
  subs: Subscription[] = [];
 
  

  constructor(private movieService: MovieService,  private router: Router,
    private route: ActivatedRoute,) {
      
     }

  ngOnInit(): void {
    // this.movieService.getMovieByTitle(this.searchText).subscribe((data: any) =>{
    //   console.log(data);  
    //   this.searchedMovies.emit(data);
    //     this.movieService.setData(data);
    // })
  }


  @ViewChild('stickHeader') header!: ElementRef;
  headerBGUrl!: string;

 

  getMoviesByTitle(){
    console.log(this.searchText);
    this.subs.push(this.movieService.getMovieByTitle(this.searchText).subscribe(data => {
      //this.movies = data;
      console.log('In search bar from header i searched for: ' + this.searchText);
      console.log('I got:');
      console.log(data);
      this.searchedMovies.emit(data);
      //set data in the service that other components can subscribe to
      this.movieService.setData(data);
    }));
   // this.movieService.searchedMovies.next(this.movies);
    this.router.navigate(['search'], {relativeTo: this.route});

  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }

  }


}
