import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKeys } from 'apikeys';

import { Book } from '../models/Book';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class NytimesService {

  constructor(private _http: HttpClient) { }

  getBestsellerList(): Observable<any> {
    const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
    return this._http.get(`${url}?api-key=${apiKeys.key}`);
  }

  getReview(isbn:number): Observable<any> {
    const url = 'https://api.nytimes.com/svc/books/v3/reviews.json';
    return this._http.get(`${url}?api-key=${apiKeys.key}&isbn=${isbn}`);
  }
}
