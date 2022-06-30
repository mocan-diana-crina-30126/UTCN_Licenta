import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-successfully-dialog',
  templateUrl: './successfully-dialog.component.html',
  styleUrls: ['./successfully-dialog.component.css']
})
export class SuccessfullyDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessfullyDialogComponent>) {
  }

  public confirmMessage: string = '';

  ngOnInit(): void {
  }

}
