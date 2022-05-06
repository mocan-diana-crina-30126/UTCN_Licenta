import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FavoritesService} from "../services/favorites.service";
import {Movie} from "../models/movie";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {

  public id!: number;
  movie : Movie[] = [];

  constructor(private router: ActivatedRoute,private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.addToFavoritesList(this.id);
    });
  }
  addToFavoritesList(id: any){

    this.favoritesService.addToFavorites(id).subscribe(data => {
        this.movie = data;
    })

  }

}
