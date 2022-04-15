import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchText : String = '';
  searchedMovies: Movie[] = [];
  private subscription!: Subscription;
  public movies: Movie[] = [];
  title!: String;

  data: any[] = [];


   

  constructor(private movieService: MovieService, private router: ActivatedRoute) {
    //this.displayOnSearchResults();
   }
   ngOnInit(){
  
    this.movieService.getData().subscribe(
      (data: any) => {this.data = data;}
    );
   }
   
    
   

  //  public getMovieByTitle(): void {
  //   console.log(this.searchText);
  //   this.subscription = this.movieService.getMovieByTitle(this.searchText).subscribe(data => {
  //     console.log(data);
  //     this.searchedMovies = data;
  //     //this.sliderConfigSearch.slidesToShow = data.length;
  //   })
  // }




  }



