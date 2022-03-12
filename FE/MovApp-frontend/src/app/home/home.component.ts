
import { Component,OnDestroy, OnInit, ElementRef, HostListener} from '@angular/core';
import { Movie } from '../models/movie';
import {MovieService} from '../services/movie.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import { SliderComponent } from '../main-page/components/slider/slider.component';
import {SlickCarouselModule} from 'node_modules/ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor() { }
  

  ngOnInit(): void {
   
  }


  

}
