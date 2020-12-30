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

  getUserRanking(){
    return this.http.get('http://localhost:4000/users');
  }

  getGuild(id){
    // select user.guild.id
    return this.http.get('http://localhost:4000/guilds/' + id);
  }
  
  registerVehicle(vehicle){
    // select user.guild.id
    console.log(vehicle)
    return this.http.post('http://localhost:4000/vehicles/register', vehicle);
  }
  
  updateVehicle(id, vehicle){
    // select user.guild.id
    console.log(id)
    return this.http.put('http://localhost:4000/vehicles/' + id, vehicle);
  }

  deleteVehicle(id){
    // select user.guild.id
    console.log(id)
    return this.http.delete('http://localhost:4000/vehicles/' + id);
  }

  getDashboard(id){
    return this.http.get('http://localhost:4000/workouts/dashboard/'+ id);
  }

  
}
