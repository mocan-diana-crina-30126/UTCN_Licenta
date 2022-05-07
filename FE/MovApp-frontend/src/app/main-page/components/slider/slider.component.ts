import {Component, Input, OnInit} from '@angular/core';
import {Movie} from 'src/app/models/movie';
import {MovieService} from 'src/app/services/movie.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TokenStorageService} from 'src/app/services/token-storage.service';
import {FavoritesService} from 'src/app/services/favorites.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() sliderConfig: any;
  @Input() movies: Movie[] = [];
  @Input() title!: string;
  content: String[] = [];
  public id!: number;
  userId!: number;
  movieId!: number;
  movie: [] = [];


  constructor(private router: ActivatedRoute, private movieService: MovieService, private routerr: Router, private tokenStorageService: TokenStorageService, private favoritesService: FavoritesService) {
  }

  ngOnInit(): void {


  }

  addToFavoritesList(id: any) {
    console.log("Post request for",id)
    this.favoritesService.addToFavorites(id).subscribe();
  }

}
