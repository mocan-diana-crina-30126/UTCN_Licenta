import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from "../services/token-storage.service";


@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  isLoggedIn: boolean = false;
  roles: String[] = [];
  isOk: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //Authentication and Authorization Code here
    //Calling a user service - pass user/pwd and make sure the user is correct

    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      console.log('Logare: ' + this.isLoggedIn + ' Rol: ' + this.roles);
      if (this.roles.includes('ROLE_ADMIN')) {
        this.isOk = true;
      }

    } else {

      this.isOk = false;

    }
    if (this.isOk) {

      return true;
    } else {
      this.router.navigate(['/error']);
      return false;
    }


  }

}
