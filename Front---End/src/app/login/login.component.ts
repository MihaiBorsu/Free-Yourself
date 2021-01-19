import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'
import * as bcrypt from 'bcryptjs';
import {EncrDecrService} from '../services/encr-decr.service';
import {NavbarComponent} from '../components/navbar/navbar.component';
import { showNotification } from '../helpers/notification'

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
    private auth: AuthenticationService,
    private crypt: EncrDecrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit() {

    let hash = this.crypt.set("123456789#@!", this.loginForm.value.password)
    this.loginForm.value.password = hash
    this.auth.login(this.loginForm.value).subscribe(
      res => {    
        localStorage.setItem('isLogged', 'true')
        this.router.navigate(['/']);
      },
      err => {
        console.log("Login not working");
        showNotification('top','center', 'Wrong Credentials. Try again!')  
      }
    )
  }
}


