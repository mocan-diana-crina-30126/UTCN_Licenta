import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";
import {Token} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService) {
  }

  isLoggedIn: boolean = false;
  roles: String[] = [];

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //Authentication and Authorization Code here
    //Calling a user service - pass user/pwd and make sure the user is correct

    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      console.log('Logare: ' + this.isLoggedIn + ' Rol: ' + this.roles);
      return true;
    }
    else{
      console.log('User nelogat');
      return false;
    }




  }

}
