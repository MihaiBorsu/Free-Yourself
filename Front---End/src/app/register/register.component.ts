import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'
import * as bcrypt from 'bcryptjs';
import {EncrDecrService} from '../services/encr-decr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    private crypt: EncrDecrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      description: ['', [Validators.required]],
  });
  }

  // get f() { return this.registerForm.controls; }

  onSubmit() {

    let hash = this.crypt.set("123456789#@!", this.registerForm.value.password)
    console.log(hash)
    this.registerForm.value.password = hash

    this.auth.register(this.registerForm.value).subscribe(
      res => {
        console.log("Register working");
        localStorage.setItem('isLogged', 'true')
        this.router.navigate(['/']);

      },
      err => {
        console.log("Register not working");

      }
    )
  }

}
