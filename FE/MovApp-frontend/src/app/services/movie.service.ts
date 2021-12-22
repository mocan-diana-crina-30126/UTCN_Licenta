import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getMovies(): Observable<Movie[]>{
        return this.http.get<Movie[]>(`${this.apiServerUrl}/movies/all`);
   
    }

    // public getMovieInfo(): Observable<Movie[]>{
    //   return this.http.get<Movie[]>(`${this.apiServerUrl}/movies/{id}`);
    // }

}