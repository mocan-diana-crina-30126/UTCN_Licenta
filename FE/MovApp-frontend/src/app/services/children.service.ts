import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {TokenStorageService} from "./token-storage.service";
import {Children} from "../models/children";

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {
  private apiServerUrl = environment.apiBaseUrl;

  httpOptions = {
    headers: new HttpHeaders({'Authorization': this.tokenStorageService.getToken()})
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  public getCartoons(): Observable<Children[]> {
    return this.http.get<Children[]>(`${this.apiServerUrl}/children/all`);
  }

  public getCartoonContent(id: number): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/children/video/${id}`, this.httpOptions);
  }


}
