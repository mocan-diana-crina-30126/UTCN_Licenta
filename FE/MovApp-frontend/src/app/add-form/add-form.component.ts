import {Component, Input, OnInit} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {MovieService} from "../services/movie.service";
import {Observable} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SuccessfullyDialogComponent} from "../successfully-dialog/successfully-dialog.component";


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {


  constructor( private formBuilder: FormBuilder, private movieService: MovieService, public dialog: MatDialog) { }

   @Input() form!: FormGroup;
  movie: any;
  image: any;
  dialogRefSuccess!: MatDialogRef<SuccessfullyDialogComponent>;

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.warn('Movie added successfully!', this.form.value);
    const title = this.form.get("title")?.value;
    const duration = this.form.get("duration")?.value;
    const releaseDate = this.form.get("releaseDate")?.value;
    const imdbRating = this.form.get("imdbRating")?.value;
    const popularity = this.form.get("popularity")?.value;
    console.log(this.movie)
    console.log(this.image)
    console.log(title)
    console.log(duration)
    console.log(releaseDate)
    console.log(imdbRating)
    console.log(popularity)

    this.movieService.addMovie(this.movie,this.image,title,duration,releaseDate,imdbRating,popularity).subscribe(data =>{
      this.form.reset();
    });

    this.dialogRefSuccess = this.dialog.open(SuccessfullyDialogComponent, {
      disableClose: false
    });
    this.dialogRefSuccess.componentInstance.confirmMessage = "Movie added successfully!";
    this.dialogRefSuccess.afterClosed().subscribe(result => {
      window.location.reload();
    });



  }

  onMovieSelected(event: any) {
    if (event.target.files.length > 0) {
      this.movie = event.target.files[0];
    }
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }



}
