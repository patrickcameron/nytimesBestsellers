import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NytimesService } from '../../services/nytimes.service';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Output() checkIfSaved: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleSaveBook: EventEmitter<number> = new EventEmitter<number>();
  isSaving: boolean = false;

  constructor(private _booksService: NytimesService) { }

  ngOnInit(): void {
    // this.getReview(this.book.primary_isbn13);
  }

  saveBook(isbn) {
    this.isSaving = !this.isSaving;
    setTimeout(() => {
      this.toggleSaveBook.emit(isbn);
      this.isSaving = !this.isSaving;
      this.book.isSaved = !this.book.isSaved;
    }, 1000);
  }

  // getReview(isbn:number) {
  //   this._booksService.getReview(isbn).subscribe(data => {
  //     console.log(data);
  //   });
  // }
}
