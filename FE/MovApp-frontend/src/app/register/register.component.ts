import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SuccessfullyDialogComponent} from "../successfully-dialog/successfully-dialog.component";


/*This component binds form data (username, email, password) from template to AuthService.register() method that returns an Observable object.
*/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dialogRef!: MatDialogRef<SuccessfullyDialogComponent>;

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) { }


  ngOnInit(): void {

  }

  onSubmit(): void {

   const { username, email, password } = this.form;
   this.authService.register(username, email, password). subscribe(
     data => {
       console.log(data);
       this.isSuccessful = true;
       this.isSignUpFailed = false;
       this.dialogRef = this.dialog.open(SuccessfullyDialogComponent, {
         disableClose: false

       });
       this.dialogRef.componentInstance.confirmMessage = "Registered successfully!";

       this.dialogRef.afterClosed().subscribe(result =>{
         window.location.reload();
       });
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
