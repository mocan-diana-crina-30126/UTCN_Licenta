import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MovieService} from "../services/movie.service";
import {Subscription} from "rxjs";
import {Movie} from "../models/movie";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  movieSub!: Subscription;
  routeSub!: Subscription;
  movieId!: any;
  movie!: Movie;

  constructor(private activatedRoute: ActivatedRoute,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.movieId = params['id'];
      this.getMovieDetails(this.movieId)
    })
  }

  getMovieDetails(id: any): void {
    this.movieSub = this.movieService.getMovieInfo(id).subscribe(movieResp => {
      this.movie = movieResp;
    })
  }

  ngOnDestroy(): void {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
