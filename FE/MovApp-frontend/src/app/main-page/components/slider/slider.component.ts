import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

@Input() sliderConfig:any;
@Input() movies: Movie[] = [];
@Input() title!: string;


constructor(private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

public displayVideo(){

  this.router.navigate(['video'], {relativeTo: this.route});
}


  

  

}
