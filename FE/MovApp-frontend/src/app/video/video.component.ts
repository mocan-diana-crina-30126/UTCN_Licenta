import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() movies: Movie[] = [];
  data: any;
  public id!: number;

  constructor(private movieService: MovieService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      this.getMovieContent(this.id);
    })
  }

  getMovieContent(id: any){
    this.movieService.getMovieContent(id).subscribe((data => { this.data = data; console.log(this.data)} ));
  }

}
