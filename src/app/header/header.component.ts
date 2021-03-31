import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;

  
  // switchView() {
  //   if (this.isNoteView) {
  //     this.routerService.routeToListView();
  //     this.isNoteView = false;
  //   } else {
  //     this.routerService.routeToNoteView();
  //     this.isNoteView = true;
  //   }
  // }

  constructor(private router: Router, 
    private routerService: RouterService
    ,private location: Location) {
    router.events.subscribe((val) => {
      if (location.path().indexOf('listview') > -1) {
        this.isNoteView = false;
      }
    });
  }
}
