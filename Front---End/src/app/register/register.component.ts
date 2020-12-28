import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'
import * as bcrypt from 'bcryptjs';

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
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      aboutMe: ['', [Validators.required]],
  });
  }

  // get f() { return this.registerForm.controls; }

  onSubmit() {
    const hash = bcrypt.hashSync(this.registerForm.value.password,10)
    this.registerForm.value.password = hash
    this.auth.register(this.registerForm.value)
  }

}
