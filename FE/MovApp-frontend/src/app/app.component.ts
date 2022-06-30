import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showHead: boolean = false;
  private _searchedMovies: any[] = [];


  get data(): any[] {
    return this._searchedMovies;
  }

  set data(data: any[]) {
    this._searchedMovies = data;
  }

  constructor(
    private router: Router
  ) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/register') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }


  ngOnInit(): void {
  }

}
