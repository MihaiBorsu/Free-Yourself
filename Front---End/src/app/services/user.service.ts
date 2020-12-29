import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
// import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // updateProfile2(userData){
  //   let body = {
  //     "username": userData.username,
  //     "email": userData.email,
  //     "country": userData.country,
  //     "city": userData.city,
  //     "phoneNumber": userData.phoneNumber,
  //     "description": userData.description
  //   } 
  //   return this.http.put('http://localhost:4000/users', body);
  // }

  getProfile(){
    let user = <User>JSON.parse(localStorage.getItem('user'));
    return this.http.get('http://localhost:4000/users/' + user.id);
  }

  updateProfile(userData){
    let user = <User>JSON.parse(localStorage.getItem('user'));
    return this.http.put('http://localhost:4000/users/' + user.id, userData);
  }

  getGuilds(){
    return this.http.get('http://localhost:4000/guilds');
  }

  getVehicles(){
    return this.http.get('http://localhost:4000/vehicles');
  }
}
