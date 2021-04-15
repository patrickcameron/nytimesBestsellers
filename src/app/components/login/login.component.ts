import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._firebaseService.login(this.email, this.password)
      .catch(err => {
        // TODO: Bulma-based error message.
        alert(err.message);
      });
  }

}
