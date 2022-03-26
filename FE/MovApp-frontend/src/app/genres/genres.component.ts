import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { GenreService } from '../services/genre.service';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  @Input() movies : Movie[] = [];
  genres : Genre[] = [];
  movie : Movie[] = [];
  title!: string;
  public id!: number;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };
  

  constructor(private movieService: MovieService, private genreService: GenreService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getMovieGenre(this.id);
    });
  }

  getMovieGenre(id: any){
    this.movieService.getMovieGenre(id).subscribe((data => {this.movie = data; console.log(this.movie)}));
  }

}
