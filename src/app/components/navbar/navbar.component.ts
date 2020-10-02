import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor( private _firebaseService: FirebaseService, private _router: Router) { }

  ngOnInit(): void {
    this._firebaseService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
      } else {
      this.isLoggedIn = false;
      }
    })
  }

  logout() {
    this._firebaseService.logout();
    this._router.navigate(['/']); // TODO: Change redirection.
  }

}
