import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly rootUrl = 'http://localhost:49189/api'
  logedIn = false

  constructor(private http:HttpClient) { }


  login(formData){
    console.log(formData);
    return this.http.post(this.rootUrl + '/login', formData)
    // return this.http.post(this.rootUrl + '/login', formData)
  }

  register(formData){
    console.log(formData);
    return this.http.post(this.rootUrl + '/register', formData)
  }
}
