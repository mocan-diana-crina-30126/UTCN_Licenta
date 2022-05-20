import {Component, OnInit, ViewEncapsulation, DefaultIterableDiffer, Input} from '@angular/core';
import {HttpResponse, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {UploadFileService} from '../services/upload-file.service';
import {MovieService} from "../services/movie.service";
import {Movie, MovieColumns} from "../models/movie";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

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


  constructor(public dialog: MatDialog, private movieService: MovieService,  private formBuilder: FormBuilder) {
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
      image: ''

    });
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
    console.log(movie);
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
    this.displayEditForm = true;
  }

  toggleAddForm() {
    this.displayForm = !this.displayForm;
  }

  removeRow(id: number) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (m: Movie) => m.id !== id
      );
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
