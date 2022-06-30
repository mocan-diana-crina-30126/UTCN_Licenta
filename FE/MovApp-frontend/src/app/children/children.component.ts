import {Component, OnInit} from '@angular/core';
import {ChildrenService} from "../services/children.service";
import {Children} from "../models/children";

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {

  cartoons: Children[] = [];

  constructor(private childrenService: ChildrenService) {
  }

  ngOnInit(): void {
    this.getAllCartoons();
  }

  getAllCartoons() {
    this.childrenService.getCartoons().subscribe(data => {
      this.cartoons = data;
      console.log(this.cartoons);
    });
  }

}
