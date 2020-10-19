import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Input() context: string;
  @Input() isLoggedIn: boolean;

  constructor(private _firebaseService: FirebaseService) { }

  ngOnInit(): void {}

  toggleSaveBook(book: Book) {
    if (book.isSaved) {
      this._firebaseService.removeBook(book.primary_isbn13);
    } else {
      this._firebaseService.saveBook(book);
    }
    book.isSaved = !book.isSaved;
  }
}
