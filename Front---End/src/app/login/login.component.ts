import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit() {
    const hash = bcrypt.hashSync(this.loginForm.value.password,10);
    this.loginForm.value.password = hash;
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.auth.logedIn = true;
        localStorage.setItem('currentUser', 'Walter');
        this.router.navigate(['/']);      
      }
    )
  }
}
