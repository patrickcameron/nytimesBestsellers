import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { NytimesService } from '../../services/nytimes.service';
import { FirebaseService } from '../../services/firebase.service';

import { Book } from '../../models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Input() isLoggedIn: boolean;
  @Input() showBookRank: boolean = true;
  @Output() checkIfSaved: EventEmitter<any> = new EventEmitter<any>();
  isSaving: boolean = false;

  constructor(private _booksService: NytimesService, private _firebaseService: FirebaseService) { }

  ngOnInit(): void {
    // this.getReview(this.book.primary_isbn13);
  }

  saveBook(book: Book) {
    console.log('book component saveBook()');
    console.log(book);
    this._firebaseService.saveBook(book);
  }

  // getReview(isbn:number) {
  //   this._booksService.getReview(isbn).subscribe(data => {
  //     console.log(data);
  //   });
  // }
}
