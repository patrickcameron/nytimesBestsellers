import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  books: any;
  userId: any;

  constructor(private _firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this._firebaseService.getSavedBooks().subscribe(books => {
      console.log(books);
    })
  }

}
