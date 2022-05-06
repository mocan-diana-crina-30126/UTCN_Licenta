import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const FAVORITES_API = 'http://localhost:8080/favorites';



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': this.tokenStorageService.getToken() })
  };

  constructor(private http:HttpClient, private tokenStorageService: TokenStorageService) { }

  addToFavorites(movie_id: number): Observable<any>{
      return this.http.post(FAVORITES_API , {
          movie_id
      }, this.httpOptions);
  }





}
