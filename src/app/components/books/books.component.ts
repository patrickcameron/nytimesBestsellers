import { Component, OnInit } from '@angular/core';
import { NytimesService } from '../../services/nytimes.service';
import { FirebaseService } from '../../services/firebase.service';
import { devlog } from '../../helpers/devlog';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[];
  bookLists: any;
  booksLoaded: boolean = false;
  isLoggedIn: boolean;
  listDate: Date;
  listTitle: string;
  savedBooks: Book[];

  constructor(
    private _booksService: NytimesService,
    private _firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {

    this._firebaseService.getAuth().subscribe(auth => {
      if (auth) {
        devlog('User logged in');
        this.isLoggedIn = true;
        this._firebaseService.getSavedBooks().subscribe(books => {
          devlog(books);
          this.savedBooks = books;
          this.getNYTBooks();
        });
      } else {
        devlog('User not logged in');
        this.isLoggedIn = false;
        this.getNYTBooks();
      }
    })
  }

  getNYTBooks() {
    this._booksService.getBestsellerList().subscribe(data => {
      if (!this.booksLoaded) {
        console.log(data);
        devlog('Load books');
        this.listTitle = data.results.list_name;
        this.listDate = this.formatDate(data.results.bestsellers_date);
        this.books = data.results.books.map(book => {
          return {
            ...book,
            isSaved: this.isLoggedIn ? this.checkIfSaved(book.primary_isbn13) : false
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

  // Convert date from 'YYYY-MM-DD' to 'MMM DD, YYYY'.
  formatDate(date:string) {
    const dateVals = date.split('-');
    const dateArray = dateVals.map(val => {
      return parseInt(val);
    });
    const newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    return newDate;
  }
}
