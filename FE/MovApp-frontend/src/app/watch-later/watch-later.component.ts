import { Component, OnInit } from '@angular/core';
import {Movie} from "../models/movie";
import {WatchLaterService} from "../services/watch-later.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {SuccessfullyDialogComponent} from "../successfully-dialog/successfully-dialog.component";

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent implements OnInit {

  public id!: number;
  movie: Movie[] = [];
  dialogRef!: MatDialogRef<ConfirmationDialogComponent>;
  dialogRefSuccess!: MatDialogRef<SuccessfullyDialogComponent>;

  constructor(private watchLaterService: WatchLaterService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllWatchLaterMovies();
  }

  getAllWatchLaterMovies() {
    //console.log("get all watch later movies");
    this.watchLaterService.getAllWatchLaterMovies().subscribe(data => {
      this.movie = data;
      //console.log(this.movie);
    })
  }

  deleteWatchLaterMovie(id: number) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.watchLaterService.deleteWatchLaterMovieById(id).subscribe(data => {
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
