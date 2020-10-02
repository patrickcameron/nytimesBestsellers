import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _firebaseService: FirebaseService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._firebaseService.register(this.email, this.password)
    .then(res => {
      this._router.navigate(['/'])
    })
    .catch(err => {
      alert('err.message');
    });
  }

}
