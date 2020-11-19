import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.isInvalid = true;
      return;
    }

    const formValue = this.loginForm.getRawValue();

    const user: string = formValue.username;

    this.store.dispatch(new Login(user));

    this.router.navigate(['/']);
  }
}
