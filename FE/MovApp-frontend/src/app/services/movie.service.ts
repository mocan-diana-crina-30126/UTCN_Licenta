import {Injectable} from "@angular/core";
import {BehaviorSubject, forkJoin, Observable} from "rxjs";
import {Movie} from "../models/movie";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {TokenStorageService} from "./token-storage.service";

const enum endpoint {

  all = '/movies/all',
  populars = '/movies/populars',
  top_rated = '/movies/top_rated',
  upcoming = '/movies/upcoming',
  trending = '/movies/trending',
  originals = '/movies/originals',
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiServerUrl = environment.apiBaseUrl;
  public searchText = '';
  private _searchedMovies: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private form: any = undefined;

  setForm(form: any) {
    this.form = form;
  }

  getForm() {
    return this.form;
  }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': this.tokenStorageService.getToken()})
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  getData(): Observable<any> {
    return this._searchedMovies.asObservable();
  }

  setData(data: any) {
    this._searchedMovies.next(data);
  }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.all}`);

  }


  public getPopularMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.populars}`);
  }

  public getTopRatedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.top_rated}`);
  }

  public getUpcomingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.upcoming}`);
  }

  public getTrendingMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.trending}`);
  }

  public getOriginalsMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}${endpoint.originals}`);
  }


  public getMovieInfo(id: any): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiServerUrl}/movies/${id}`);
  }


  public getMovieByTitle(searchText: any): Observable<Movie[]> {
    let url = `${this.apiServerUrl}/movies/search`

    let queryParams = new HttpParams();
    queryParams = queryParams.append("title", searchText);

    return this.http.get<Movie[]>(url, {params: queryParams});
  }


  public getMovieByGenre(searchText: any): Observable<Movie[]> {
    let url = `${this.apiServerUrl}/movies/search`

    let queryParams = new HttpParams();
    queryParams = queryParams.append("genre", searchText);

    return this.http.get<Movie[]>(url, {params: queryParams});
  }

  public getMovieGenre(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}/genres/${id}`);
  }

  public getMovieContent(id: number): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/movies/video/${id}`, this.httpOptions);
  }

  public addMovie(movie: any, image: any, title: string, duration: string, release_date: string, imdb_rating: string, popularity: string): Observable<Movie> {

    let fd = new FormData();
    fd.append('movie', movie);
    fd.append('image', image);
    fd.append('title', title);
    fd.append('duration', duration);
    fd.append('releaseDate', release_date);
    fd.append('imdbRating', imdb_rating);
    fd.append('popularity', popularity);

    return this.http.post<Movie>(`${this.apiServerUrl}/movies`, fd);
  }

  public deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiServerUrl}/movies/${id}`);
  }

  public deleteMovies(movies: Movie[]): Observable<Movie[]> {
    return forkJoin(
      movies.map((movie) =>
        this.http.delete<Movie>(`${this.apiServerUrl}/movies/${movie.id}`)
      )
    );
  }

  public editMovie(id: number, movie: any, image: any, title: string, duration: number, release_date: Date, imdb_rating: number, popularity: number): Observable<Movie> {

    let fd = new FormData();
    fd.append('movie', movie);
    fd.append('image', image);
    fd.append('title', title);
    fd.append('duration', duration + '');
    fd.append('releaseDate', release_date + '');
    fd.append('imdbRating', imdb_rating + '');
    fd.append('popularity', popularity + '');

    return this.http.put<Movie>(`${this.apiServerUrl}/movies/${id}`, fd);

  }


}
