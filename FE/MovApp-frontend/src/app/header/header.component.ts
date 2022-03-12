import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {Movie} from "../models/movie";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sticky = false;
  searchText = '';
  trending: Movie[] = [];
  genres: string [] = ['Action','Drama'];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  @ViewChild('stickHeader') header!: ElementRef;
  headerBGUrl!: string;

  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }

  }

  public getMovieByTitle(): void {
    console.log(this.searchText);
    this.movieService.getMovieByTitle(this.searchText).subscribe(data => {
      console.log(data)
      this.trending = data
      //this.sliderConfigSearch.slidesToShow = data.length;
    })
  }



}
