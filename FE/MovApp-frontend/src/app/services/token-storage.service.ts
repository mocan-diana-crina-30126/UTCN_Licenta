import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

/* This service manages token and user information (username, email, roles) inside
Browser's Session Storage. For Logout, we only need to clear this Session Storage
*/

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router) {
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/login'])
  }

  public saveToken(token: string): void {

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

  }

  public getToken(): string {
    let token = window.sessionStorage.getItem(TOKEN_KEY)
    return token == null ? "" : token;

  }

  public saveUser(user: any): void {

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

  }

  public getUser(): any {

    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};

  }


}
