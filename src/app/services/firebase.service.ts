import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { devlog } from '../helpers/devlog';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  savedBooks: Observable<any>;
  user: Observable<any>;
  authState: any = null;

  constructor(
    private _afs: AngularFirestore,
    private _afAuth: AngularFireAuth,
    private _router: Router
  ) {}

  getSavedBooks(): Observable<any> {
    this.savedBooks = this._afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this._afs
          .collection('userData')
          .doc(user.uid)
          .collection('savedBooks')
          .snapshotChanges().pipe(map(changes => {
            return changes.map(action => {
              const data = action.payload.doc.data();
              data.id = action.payload.doc.id;
              return data;
            })
          }))
        } else {
          return new Observable; // Return empty observable.
        }
      })
    )
    return this.savedBooks;
  }

  saveBook(book: Book) {
    devlog('firebaseservice savebook()');
    this._afAuth.authState.subscribe(user => {
      if (!user) return
      const userId = user.uid;
      this._afs.collection('userData')
        .doc(userId)
        .collection('savedBooks')
        .doc(book.primary_isbn13)
        .set(book);
    });
  }

  removeBook(isbn: string) {
    devlog('firebaseservice removeBook()');
    this._afAuth.authState.subscribe(user => {
      if (!user) return
      const userId = user.uid;
      this._afs.collection('userData')
        .doc(userId)
        .collection('savedBooks')
        .doc(isbn)
        .delete();
    });
  }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(
          userData => {
            this._router.navigate(['/']);
            resolve(userData);
          }, err => reject(err)
        )
    });
  }

  register(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          devlog(userData);
          const userId = userData.user.uid;
          this._afs.collection('userData').doc(userId).set({});
          this._router.navigate(['/']);
          resolve(userData);
        },
          err => reject(err))
    })
  }

  logout() {
    this._afAuth.auth.signOut().then(() => {
      this._router.navigate(['/']);
    });
  }

  getAuth() {
    return this._afAuth.authState.pipe(auth => auth);
  }

}
