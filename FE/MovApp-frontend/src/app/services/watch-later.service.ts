import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {Movie} from "../models/movie";

const WATCHLATER_API = 'http://localhost:8080/watch';

@Injectable({
  providedIn: 'root'
})

export class WatchLaterService {

  httpOptions = {
    headers: new HttpHeaders({'Authorization': this.tokenStorageService.getToken()})
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }


  addToWatchLater(movie_id: number): Observable<any> {
    return this.http.post(WATCHLATER_API, movie_id, this.httpOptions);
  }

  getAllWatchLaterMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(WATCHLATER_API + '/all', this.httpOptions);
  }

  deleteWatchLaterMovieById(id: number): Observable<any> {
    return this.http.delete(WATCHLATER_API + '/' + id, this.httpOptions);
  }

}
