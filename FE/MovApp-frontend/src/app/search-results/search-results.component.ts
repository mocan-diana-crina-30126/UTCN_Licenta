import {Component, OnInit} from '@angular/core';
import {Movie} from '../models/movie';
import {MovieService} from '../services/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchText: String = '';
  searchedMovies: Movie[] = [];
  public movies: Movie[] = [];
  title!: String;

  data: any[] = [];


  constructor(private movieService: MovieService) {
  }

  ngOnInit() {

    this.movieService.getData().subscribe(
      (data: any) => {
        this.data = data;
      }
    );
  }


}



