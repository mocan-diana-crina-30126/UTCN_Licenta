import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';

import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

@Input() movies : Movie[] = [];



  constructor(private movieService: MovieService) { }

  ngOnInit() {
    
  }


}
