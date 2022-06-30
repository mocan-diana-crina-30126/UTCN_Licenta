import {
  Component,
  OnInit,
  ViewEncapsulation,
  DefaultIterableDiffer,
  Input,
  ViewChild,
  ElementRef,
  Output, EventEmitter
} from '@angular/core';
import {HttpResponse, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {UploadFileService} from '../services/upload-file.service';
import {MovieService} from "../services/movie.service";
import {Movie, MovieColumns} from "../models/movie";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {AddDialogComponent} from "../add-dialog/add-dialog.component";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {SuccessfullyDialogComponent} from "../successfully-dialog/successfully-dialog.component";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {

  displayedColumns: string[] = MovieColumns.map((col) => col.key);
  columnsSchema: any = MovieColumns;
  dataSource = new MatTableDataSource<Movie>();
  valid: any = {};

  form!: FormGroup;
  displayForm: boolean = false;

  editForm!: FormGroup;

  displayEditForm: boolean = false;
  edit: boolean = false;

  dialogRef!: MatDialogRef<ConfirmationDialogComponent>;
  dialogRefSuccess!: MatDialogRef<SuccessfullyDialogComponent>;

  constructor(public dialog: MatDialog, private movieService: MovieService, private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {

    this.getListOfMovies();
    this.form = this.formBuilder.group({
      title: '',
      duration: '',
      releaseDate: '',
      imdbRating: '',
      popularity: '',
      movie: '',
      image: '',

    });


  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';

    dialogConfig.data = this.form;

    this.edit = true;

    this.dialog.open(AddDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(AddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        if (result !== undefined) {
          if (result !== 'no') {
            const enabled = "Y"
            console.log(result);
          } else if (result === 'no') {
            console.log('User clicked no.');
            this.dialog.closeAll();
          }
        }
      }
    );
  }

  openEditDialog(movie: Movie) {

    this.editForm = this.formBuilder.group({
      title: movie.title,
      duration: movie.duration,
      releaseDate: movie.release_date,
      imdbRating: movie.imdb_rating,
      popularity: movie.popularity,
      movie: movie.movie,
      image: movie.image,
      id: movie.id
    });

    this.movieService.setForm(this.editForm);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';


    dialogConfig.data = this.editForm;
    console.log("DATELE SUNT: ")
    console.log(dialogConfig.data);

    this.dialog.open(EditDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        if (result !== undefined) {
          if (result !== 'no') {
            const enabled = "Y"
            console.log(result);
          } else if (result === 'no') {
            console.log('User clicked no.');
            this.dialog.closeAll();
          }
        }
      }
    );
  }

  public getListOfMovies(): void {

    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.dataSource.data = response;
        console.log(this.dataSource);
      }
    );

  }

  editRow(movie: Movie) {
    this.openEditDialog(movie);
    this.displayEditForm = !this.displayEditForm;
  }

  toggleAddForm() {
    this.displayForm = !this.displayForm;
    this.openDialog();
  }

  removeRow(id: number) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.movieService.deleteMovie(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (m: Movie) => m.id !== id
          );
        });

        this.dialogRefSuccess = this.dialog.open(SuccessfullyDialogComponent, {
          disableClose: false
        });
        this.dialogRefSuccess.componentInstance.confirmMessage = "Deleted successfully!";
        this.dialogRefSuccess.afterClosed().subscribe(result => {
          window.location.reload();
        });

      }

    });
  }

  removeSelectedRows() {
    const movies = this.dataSource.data.filter((m: Movie) => m.isSelected);
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.movieService.deleteMovies(movies).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (m: Movie) => !m.isSelected
            );
          });
          this.dialogRefSuccess = this.dialog.open(SuccessfullyDialogComponent, {
            disableClose: false
          });
          this.dialogRefSuccess.componentInstance.confirmMessage = "Deleted successfully!";
          this.dialogRefSuccess.afterClosed().subscribe(result => {
            window.location.reload();
          });
        }
      });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }


}
