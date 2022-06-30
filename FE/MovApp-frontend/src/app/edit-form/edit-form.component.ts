import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MovieService} from "../services/movie.service";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private movieService: MovieService) {
  }

  @Input() editForm!: FormGroup;
  movie: any;
  image: any;

  ngOnInit(): void {

    this.editForm = this.movieService.getForm();

  }

  onSubmit(): void {
    console.warn('Movie edited successfully!', this.editForm.value);
    const title = this.editForm.get("title")?.value;
    const duration = this.editForm.get("duration")?.value;
    const releaseDate = this.editForm.get("releaseDate")?.value;
    const imdbRating = this.editForm.get("imdbRating")?.value;
    const popularity = this.editForm.get("popularity")?.value;
    const id = this.editForm.get("id")?.value;
    console.log(this.movie)
    console.log(this.image)
    console.log(title)
    console.log(duration)
    console.log(releaseDate)
    console.log(imdbRating)
    console.log(popularity)

    this.movieService.editMovie(id, this.movie, this.image, title, duration, releaseDate, imdbRating, popularity).subscribe(data => {
      window.location.reload();
      this.editForm.reset();
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
