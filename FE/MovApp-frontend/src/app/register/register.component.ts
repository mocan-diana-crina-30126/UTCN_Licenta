import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


/*This component binds form data (username, email, password) from template to AuthService.register() method that returns an Observable object.
*/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    
  }

  onSubmit(): void {

   const { username, email, password } = this.form;
   this.authService.register(username, email, password). subscribe(
     data => {
       console.log(data);
       this.isSuccessful = true;
       this.isSignUpFailed = false;
       this.reloadPage();
      //  this.router.navigate(['/login']);
     },
     err => {
       this.errorMessage = err.error.message;
       this.isSignUpFailed = true;

     }
   );

  }
  reloadPage(): void {
    window.location.reload();
  }

}
