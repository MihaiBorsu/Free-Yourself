import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // readonly rootUrl = 'http://localhost:4000'
  // navbar = false
  obj: User

  constructor(private http:HttpClient) { }


  login(formData){
    console.log(typeof formData);
    let body = {
      "username": formData.username,
      "password": formData.password
    } 

    return this.http.post<User>('http://localhost:4000/users/authenticate', body)
    .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('currentUser', user.username)
                // localStorage.setItem('isLogged', 'true')
                // this.navbar = true
                return user;
            }));
  }

  register(formData){
    console.log(formData);
    let body = {
      "username": formData.username,
      "email": formData.email,
      "country": formData.country,
      "city": formData.city,
      "phoneNumber": formData.phoneNumber,
      "password": formData.password,
      "description": formData.description
    } 
    console.log(body)
    // return this.http.post('/users/register', formData)
    // return this.http.post(this.rootUrl + 'users/register', formData)
    return this.http.post('http://localhost:4000/users/register', body)
  }
}
