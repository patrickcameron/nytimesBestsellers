import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _firebaseService: FirebaseService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._firebaseService.login(this.email, this.password)
      .then(res => {
        this._router.navigate(['/']);
      })
      .catch(err => {
        // TODO: Bulma-based error message.
        alert(err.message);
      });
  }

}
