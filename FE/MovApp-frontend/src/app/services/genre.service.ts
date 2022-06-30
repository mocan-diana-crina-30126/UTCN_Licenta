import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Genre} from "../models/genre";
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class GenreService {

  private apiServerUrl = environment.apiBaseUrl;
  private genres: Genre[] = [];

  constructor(private http: HttpClient) {
  }

  public getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiServerUrl}/genres/all`);
  }


}
