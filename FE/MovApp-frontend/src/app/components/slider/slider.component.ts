import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

@Input() sliderConfig:any;
@Input() movies: Movie[] = [];
@Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
