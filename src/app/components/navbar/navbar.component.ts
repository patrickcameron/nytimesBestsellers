import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  savedBooksCount: number = 0;

  constructor(private _firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this._firebaseService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.getSavedBooksCount();
      } else {
      this.isLoggedIn = false;
      }
    })
  }

  logout() {
    this._firebaseService.logout();
  }

  getSavedBooksCount() {
    this._firebaseService.getSavedBooks().subscribe(books => {
      this.savedBooksCount = books.length;
    })
  }

}
