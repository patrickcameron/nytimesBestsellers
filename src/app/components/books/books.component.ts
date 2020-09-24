import { Component, OnInit } from '@angular/core';
import { NytimesService } from '../../services/nytimes.service';
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

  constructor(private _booksService: NytimesService) { }

  ngOnInit(): void {
    this._booksService.getBestsellerList().subscribe(data => { 
      this.listTitle = data.results.list_name;
      this.listDate = this.convertDate(data.results.bestsellers_date);
      this.books = data.results.books.map(book => {
        return {
          ...book,
          isSaved: this.checkIfSaved(book.primary_isbn13)
        }
      });
    });
  }

  checkIfSaved(isbn): boolean {
    console.log('checkIfSaved');
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

  toggleSaveBook(isbn) {
    if (localStorage.getItem('savedBooks') === null) {
      console.log('bookIndex doesn\'t exist');
      let savedArray = [isbn]
      localStorage.setItem('savedBooks', isbn.toString());
      console.log(localStorage.getItem('savedBooks'));
    } else {
      let savedArray = localStorage.getItem('savedBooks').split(',');
      let bookIndex = savedArray.indexOf(isbn);
      console.log('bookIndex: ' + bookIndex);
      if (bookIndex > -1) {
        // Remove book
        console.log('bookIndex > 0. Book already saved.');
        savedArray.splice(bookIndex, 1);
        console.log(savedArray);
        localStorage.setItem('savedBooks', savedArray.toString());
        console.log(localStorage.getItem('savedBooks'));
      } else {
        // Add book
        console.log('bookIndex < 0. Book not saved.');
        savedArray.push(isbn);
        console.log(savedArray);
        localStorage.setItem('savedBooks', savedArray.toString());
        console.log(localStorage.getItem('savedBooks'));
      }
    }
  }

  convertDate(date:string) {
    const dateVals = date.split('-');
    const dateArray = dateVals.map(val => {
      return parseInt(val);
    });
    const newDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    return newDate;
  }
}
