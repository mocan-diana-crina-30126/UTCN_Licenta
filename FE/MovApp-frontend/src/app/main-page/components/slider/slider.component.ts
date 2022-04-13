import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

@Input() sliderConfig:any;
@Input() movies: Movie[] = [];
@Input() title!: string;
content: String[] = [];
public id!: number;


constructor(private router: ActivatedRoute, private movieService: MovieService, private routerr: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      this.routerr.navigate(['/video', this.id]);
    });
    this.getMovieContent(this.id);
  }

public displayVideo(){


    this.getMovieContent(this.id);


  // console.log('PLAY!');
  // this.router.navigate(['/video'], {relativeTo: this.route});
}

getMovieContent(id: any){
  this.movieService.getMovieContent(id).subscribe((data => { this.content = data; console.log(this.content) ;}));
  console.log(id);
  //this.routerr.navigate(['/video', id]);
}

}
