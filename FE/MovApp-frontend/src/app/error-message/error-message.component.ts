import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  h2Message! : string;
  h1Message! : string;

  constructor() { }

  ngOnInit(): void {

    this.h1Message = "403";
    this.h2Message = "Access Denied";

  }

}
