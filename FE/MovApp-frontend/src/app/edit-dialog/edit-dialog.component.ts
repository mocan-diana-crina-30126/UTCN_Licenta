import {Component, Inject, Input, OnInit} from '@angular/core';

import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MovieService} from "../services/movie.service";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {


  editForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data:any, private movieService: MovieService) { }

  ngOnInit(): void {

    // this.editForm = this.fb.group({
    //   title: '',
    //   duration: '',
    //   releaseDate: '',
    //   imdbRating: '',
    //   popularity: '',
    //   movie: '',
    //   image: ''
    // });


  }

  save() {
    this.dialogRef.close(this.editForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
