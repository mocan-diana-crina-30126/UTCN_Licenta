import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const enum endpoint{

  all = '/movies/all',
  latest = '/movies/latest',
  now_playing = '/movies/now_playing',
  popular = '/movies/popular',
  top_rated = '/movies/top_rated',
  upcoming = '/movies/upcoming',
  trending = '/trending/all/week',
  originals = '/discover/tv'
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getMovies(): Observable<Movie[]>{
        return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.all}`);
   
    }

    public getLatestMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.latest}`);
    }

    public getNowPlayingMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.now_playing}`);
    }

    public getPopularMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.popular}`);
    }

    public getTopRatedMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.top_rated}`);
    }

    public getUpcomingMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.upcoming}`);
    }

    public getTrendingMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.trending}`);
    }

    public getOriginalsMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.originals}`);
    }


     public getMovieInfo(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}/movies/{id}`);
    }

}