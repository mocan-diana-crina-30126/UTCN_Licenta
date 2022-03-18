import { Component, OnInit } from '@angular/core';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss']
})
export class GenresListComponent implements OnInit {

 genresList: any;
 sliderConfig = {
  slidesToShow: 9,
  slidesToScroll: 2,
  arrows: true,
  autoplay: false
};

  constructor(private _movie: GenreService) { }

  ngOnInit() {
    this.MovieGenre();
  }

  MovieGenre() {
    this._movie.getAllGenres().subscribe(data => 
      {this.genresList = data;
     console.log(this.genresList);
      }
    );
  }

}
