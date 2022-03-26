import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { Movie } from "../models/movie";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

const enum endpoint{

  all = '/movies/all',
  latest = '/movies/latest',
  now_playing = '/movies/now_playing',
  popular = '/movies/popular',
  top_rated = '/movies/top_rated',
  upcoming = '/movies/upcoming',
  trending = '/movies/trending',
  originals = '/discover/tv'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    private apiServerUrl = environment.apiBaseUrl;
    private movies: Movie[] = [];
    public searchText = '';
    public searchedMovies: Subject<Movie[]> = new Subject();
    

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

    public getMovieByTitle(searchText: any): Observable<Movie[]>{
      let url = `${this.apiServerUrl}/movies/search`

      let queryParams = new HttpParams();
      queryParams = queryParams.append("title",searchText);

      return this.http.get<Movie[]>(url, {params:queryParams});
    }


    // getByTitleObservable(): Observable<any> {
    //   return this.searchedMovies.asObservable();
    // }

    public getSearchedMoviesAsObservable(): Observable<Movie[]>{
      return this.searchedMovies.asObservable();
    }
    


  public getMovieByGenre(searchText: any): Observable<Movie[]>{
    let url = `${this.apiServerUrl}/movies/search`

    let queryParams = new HttpParams();
    queryParams = queryParams.append("genre",searchText);

    return this.http.get<Movie[]>(url, {params:queryParams});
  }

  public getMovieGenre(id: number): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiServerUrl}/genres/${id}`);
  }


}
