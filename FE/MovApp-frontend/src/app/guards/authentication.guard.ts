import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";
import {Token} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  isLoggedIn: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //Authentication and Authorization Code here
    //Calling a user service - pass user/pwd and make sure the user is correct

    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;

      console.log('Logare: ' + this.isLoggedIn );
      return true;
    }
    else{
      this.router.navigate(['/error']);
      console.log('User nelogat');
      return false;
    }




  }

}
