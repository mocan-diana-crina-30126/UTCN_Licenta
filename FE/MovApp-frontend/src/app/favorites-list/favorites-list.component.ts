import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FavoritesService} from "../services/favorites.service";
import {Movie} from "../models/movie";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {

  public id!: number;
  movie: Movie[] = [];

  constructor(private router: ActivatedRoute, private favoritesService: FavoritesService) {
  }

  ngOnInit(): void {    console.log("on init")
    this.getFavoriteMovies();
  }

  getFavoriteMovies() {
    console.log("get all favorite movies")
    this.favoritesService.getAllFavoriteMovies().subscribe(data => {
      this.movie = data;
      
      console.log(this.movie.length);
    });
    

  }

  deleteFavoriteMovie(id: number){
    this.favoritesService.deleteFavoriteMovieById(id).subscribe(data => {window.location.reload();});
  }

}
