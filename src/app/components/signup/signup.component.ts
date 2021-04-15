import { Component, OnInit } from '@angular/core';
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
    private _firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._firebaseService.register(this.email, this.password)
    .catch(err => {
      alert('err.message');
    });
  }

}
