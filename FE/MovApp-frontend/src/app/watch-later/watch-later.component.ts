import { Component, OnInit } from '@angular/core';
import {Movie} from "../models/movie";
import {WatchLaterService} from "../services/watch-later.service";

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent implements OnInit {

  public id!: number;
  movie: Movie[] = [];

  constructor(private watchLaterService: WatchLaterService) {

  }

  ngOnInit(): void {
    this.getAllWatchLaterMovies();
  }

  getAllWatchLaterMovies(){
    console.log("get all watch later movies");
    this.watchLaterService.getAllWatchLaterMovies().subscribe(data =>{
      this.movie = data;
      console.log(this.movie);
    })
  }

}
