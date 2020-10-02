import { Component, OnInit } from '@angular/core';
import { NytimesService } from '../../services/nytimes.service';
import { switchMap } from 'rxjs/operators';

import { FirebaseService } from '../../services/firebase.service';

import { Book } from '../../models/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[];
  savedBooks: Book[];
  booksLoaded: boolean = false;
  listDate: any;
  listTitle: string;

  constructor(private _booksService: NytimesService, private _firebaseService: FirebaseService) { }

  ngOnInit(): void {

    this._firebaseService.getSavedBooks().subscribe(books => {
      this.savedBooks = books;
      this.getNYTBooks();
    });
  }
  
  getNYTBooks() {
    this._booksService.getBestsellerList().subscribe(data => { 
      if (!this.booksLoaded) {
        this.listTitle = data.results.list_name;
        this.listDate = this.formatDate(data.results.bestsellers_date);
        this.books = data.results.books.map(book => {
          return {
            ...book,
            isSaved: this.checkIfSaved(book.primary_isbn13)
          }
        });
        this.booksLoaded = true;
      }
    });
  }

  checkIfSaved(isbn): boolean {
    let isSaved: boolean = false;
    this.savedBooks.forEach(book => {
      if (book.primary_isbn13 === isbn) {
        isSaved = true;
      }
    })
    return isSaved;
  }

  formatDate(date:string) {
    const dateVals = date.split('-');
    const dateArray = dateVals.map(val => {
      return parseInt(val);
    });
    const newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    return newDate;
  }
}
