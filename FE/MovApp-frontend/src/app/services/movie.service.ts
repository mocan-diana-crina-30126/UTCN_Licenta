import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { Movie } from "../models/movie";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

const enum endpoint{

  all = '/movies/all',
  populars = '/movies/populars',
  top_rated = '/movies/top_rated',
  upcoming = '/movies/upcoming',
  trending = '/movies/trending',
  originals = '/movies/originals'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    private apiServerUrl = environment.apiBaseUrl;
    private movies: Movie[] = [];
    public searchText = '';
    private _searchedMovies: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    

    constructor(private http: HttpClient){}

    getData(): Observable<any> {
      return this._searchedMovies.asObservable();
    }
  
    setData(data: any) {
      this._searchedMovies.next(data);
    }

    public getMovies(): Observable<Movie[]>{
        return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.all}`);

    }

    public getPopularMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.populars}`);
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
