import {Component, OnInit, ViewEncapsulation, DefaultIterableDiffer} from '@angular/core';
import {HttpResponse, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {UploadFileService} from '../services/upload-file.service';
import {MovieService} from "../services/movie.service";
import {Movie, MovieColumns} from "../models/movie";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

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

  constructor(public dialog: MatDialog, private movieService: MovieService) {
  }


  ngOnInit(): void {

    this.getListOfMovies();
  }


  public getListOfMovies(): void {

    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.dataSource.data = response;
        console.log(this.dataSource);
      }
    );

  }

  editRow(row: Movie) {
    if (row.id === 0) {
      this.movieService.addMovie(row.content, row.image_path, row.title, row.duration, row.release_date,row.imdb_rating, row.popularity).subscribe((newMovie: Movie) => {
        row.id = newMovie.id;
        row.isEdit = false;
      })
    } else {
      //this.movieService.updatMovie(row).subscribe(() => (row.isEdit = false));
    }
  }

  addRow() {
    const newRow: Movie = {
      id: 0,
      title: '',
      duration: 0,
      release_date: new Date(Date.now()),
      imdb_rating: 0,
      popularity: 0,
      overview: '',
      content: '',
      image_path: '',
      director_id: 0,
      language: '',
      genres: [],
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
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
