import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ApiService } from '../api.service';
import { SUCCESS_SNACKBAR_OPTIONS, ERROR_SNACKBAR_OPTIONS } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'email': new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(60)
    ]),
    'password': new FormControl('', [
      Validators.required
    ])
  });

  constructor(private api: ApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.api.login(email, password)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.open('Access granted', 'Dismiss',
                             SUCCESS_SNACKBAR_OPTIONS);
        },
        error: () => {
          this.snackBar.open('Nice try, asshole', 'Dismiss',
                             ERROR_SNACKBAR_OPTIONS);
        }
      });
  }

  formReady(): boolean {
    return this.loginForm.valid;
  }
}
