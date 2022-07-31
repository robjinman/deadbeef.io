import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ApiService } from '../api.service';
import { SUCCESS_SNACKBAR_OPTIONS, ERROR_SNACKBAR_OPTIONS } from '../utils';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.sass']
})
export class AdminLoginComponent implements OnInit {
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
  private _captchaToken: string = '';

  constructor(private _api: ApiService,
              private _snackBar: MatSnackBar,
              private _changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this._api.login(email, password, this._captchaToken)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._snackBar.open('Access granted', 'Dismiss', SUCCESS_SNACKBAR_OPTIONS);
        },
        error: () => {
          this._snackBar.open('Nice try, asshole', 'Dismiss', ERROR_SNACKBAR_OPTIONS);
        }
      });
  }

  captchaComplete(token: string) {
    this._captchaToken = token;
    this._changeDetector.detectChanges();
  }

  formReady(): boolean {
    return this.loginForm.valid && this._captchaToken.length > 0;
  }
}
