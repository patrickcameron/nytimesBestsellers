import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKeys } from 'apikeys';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class NytimesService {
  private _books;

  constructor(private _http: HttpClient) { }

  getBestsellerList(): Observable<any> {
    return new Observable(observer => {
      if (this._books) {
        observer.next(this._books)
        return observer.complete();
      }
      const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
      this._http.get(`${url}?api-key=${apiKeys.nyTimes.key}`).subscribe(books => {
        this._books = books;
        observer.next(this._books);
        observer.complete();
      })
    })
  }
}
