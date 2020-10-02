import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';


import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  savedBooks: Observable<any>;
  user: Observable<any>;
  userId: string;
  authState: any = null;

  constructor(private _afs: AngularFirestore, private _afAuth: AngularFireAuth) {
    this._afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
      console.log(this.userId);
    })
  }

  getSavedBooks(): Observable<any> {
    if (!this.userId) return;
    this.savedBooks = this._afs
        .collection('userData')
        .doc(this.userId)
        .collection('savedBooks')
        .snapshotChanges().pipe(map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data();
            data.id = action.payload.doc.id;
            console.log(data);
            return data;
          })
        }))
    return this.savedBooks;
  }

  saveBook(book: Book) {
    console.log('firebaseservice savebook()');
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

  removeBook(book: Book) {
    // TODO
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err))
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          console.log(userData);
          const userId = userData.user.uid;
          const savedBooks = {
            savedBooks: {
              9781501188817: {
                author: 'Ruth Ware',
                title: 'ONE BY ONE'
              }
            }
          };
          this._afs.collection('userData').doc(userId).set(savedBooks);
          resolve(userData);

        },
          err => reject(err))
    })
  }

  logout() {
    this._afAuth.auth.signOut();
  }

  getAuth() {
    return this._afAuth.authState.pipe(auth => auth);
  }

}
