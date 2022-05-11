import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FavoritesService} from "../services/favorites.service";
import {Movie} from "../models/movie";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {SuccessfullyDialogComponent} from "../successfully-dialog/successfully-dialog.component";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {

  public id!: number;
  movie: Movie[] = [];
  dialogRef!: MatDialogRef<ConfirmationDialogComponent>;
  dialogRefSuccess!: MatDialogRef<SuccessfullyDialogComponent>;

  constructor(private router: ActivatedRoute, private favoritesService: FavoritesService, public dialog: MatDialog) {
  }

  ngOnInit(): void {    console.log("on init")
    this.getFavoriteMovies();
  }

  getFavoriteMovies() {
    console.log("get all favorite movies")
    this.favoritesService.getAllFavoriteMovies().subscribe(data => {
      this.movie = data;

      console.log(this.movie.length);
    });


  }

  deleteFavoriteMovie(id: number){
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.favoritesService.deleteFavoriteMovieById(id).subscribe(data => {

          this.dialogRefSuccess = this.dialog.open(SuccessfullyDialogComponent, {
            disableClose: false
          });
          this.dialogRefSuccess.componentInstance.confirmMessage = "Deleted successfully!";
          this.dialogRefSuccess.afterClosed().subscribe(result =>{
            window.location.reload();
          });

        });

      }
      //this.dialogRef = null;
    });


  }

}
