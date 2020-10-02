import { Component, OnInit } from '@angular/core';
import { NytimesService } from '../../services/nytimes.service';

import { FirebaseService } from '../../services/firebase.service';

import { Book } from '../../models/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[];
  savedBooks: number[];
  listDate: any;
  listTitle: string;
  isLoggedIn: boolean = false;

  constructor(private _booksService: NytimesService, private _firebaseService: FirebaseService) { }

  ngOnInit(): void {

    // this._firebaseService.getSavedBooks().subscribe(books => {
    //   console.log(books);
    // });

    // this._firebaseService.register('patcameron5@gmail.com', '123456');

    this._firebaseService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })

    this._booksService.getBestsellerList().subscribe(data => { 
      this.listTitle = data.results.list_name;
      this.listDate = this.formatDate(data.results.bestsellers_date);
      this.books = data.results.books.map(book => {
        console.log(book);
        return {
          ...book,
          isSaved: this.checkIfSaved(book.primary_isbn13)
        }
      });
    });
  }

  saveBook(book: Book) {
    this._firebaseService.saveBook(book);
  }

  removeBook(book: Book) {
    // this._firebaseService.removeBook(book);
  }

  checkIfSaved(isbn): boolean {
    if (localStorage.getItem('savedBooks') === null) {
      return false;
    } else {
      let savedArray = localStorage.getItem('savedBooks').split(',');
      if (savedArray.indexOf(isbn) > -1) {
        return true;
      } else {
        return false;
      }
    }
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
