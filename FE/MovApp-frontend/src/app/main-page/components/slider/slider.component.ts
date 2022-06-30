import {Component, Input, OnInit} from '@angular/core';
import {Movie} from 'src/app/models/movie';
import {MovieService} from 'src/app/services/movie.service';
import {Router, ActivatedRoute} from '@angular/router';
import {TokenStorageService} from 'src/app/services/token-storage.service';
import {FavoritesService} from 'src/app/services/favorites.service';
import {WatchLaterService} from "../../../services/watch-later.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SuccessfullyDialogComponent} from "../../../successfully-dialog/successfully-dialog.component";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() sliderConfig: any;
  @Input() movies: Movie[] = [];
  @Input() title!: string;
  content: String[] = [];
  public id!: number;
  userId!: number;
  movieId!: number;
  movie: [] = [];
  dialogRef!: MatDialogRef<SuccessfullyDialogComponent>;

  constructor(private router: ActivatedRoute, private movieService: MovieService, private routerr: Router, private tokenStorageService: TokenStorageService, private favoritesService: FavoritesService, private watchLaterService: WatchLaterService, public dialog: MatDialog) {
  }

  ngOnInit(): void {


  }

  addToFavoritesList(id: any) {

    this.favoritesService.addToFavorites(id).subscribe();

    this.dialogRef = this.dialog.open(SuccessfullyDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Successfully added to favorites list!";

    this.dialogRef.afterClosed().subscribe();
  }

  private disableClose = false;

  addToWatchLaterList(id: any) {

    this.watchLaterService.addToWatchLater(id).subscribe();

    this.dialogRef = this.dialog.open(SuccessfullyDialogComponent, {
      disableClose: this.disableClose
    });
    this.dialogRef.componentInstance.confirmMessage = "Successfully added to watch later list!";

    this.dialogRef.afterClosed().subscribe();

  }

  openMovieDetails(id: any): void {
    this.routerr.navigate(['details', id]);
  }

}
