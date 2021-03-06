//user service ts
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


  getProfile(){
    let user = <User>JSON.parse(localStorage.getItem('user'));
    return this.http.get('http://localhost:4000/users/' + user.id);
  }

  updateProfile(userData){
    let user = <User>JSON.parse(localStorage.getItem('user'));
    delete userData.username
    return this.http.put('http://localhost:4000/users/' + user.id, userData);
  }

  getGuilds(){
    return this.http.get('http://localhost:4000/guilds/ranking');
  }

  getVehicles(){
    return this.http.get('http://localhost:4000/vehicles');
  }

  getUserRanking(){
    return this.http.get('http://localhost:4000/users/ranking');
  }

  getGuild(id){
    return this.http.get('http://localhost:4000/guilds/' + id);
  }
  
  registerVehicle(vehicle){
    let user = <User>JSON.parse(localStorage.getItem('user'));
    vehicle.userId = user.id
    return this.http.post('http://localhost:4000/vehicles/register', vehicle);
  }
  
  updateVehicle(id, vehicle){
    // select user.guild.id
    return this.http.put('http://localhost:4000/vehicles/' + id, vehicle);
  }

  deleteVehicle(id){
    // select user.guild.id
    return this.http.delete('http://localhost:4000/vehicles/' + id);
  }

  getDashboard(id){
    let req = {
      userid: id
    }
    return this.http.post('http://localhost:4000/workouts/dashboard', req);
  }

  getUsersInGuild(guildId){
   return this.http.get('http://localhost:4000/users/in_guild/' + guildId);
  }

  getUserId(){
    let user = <User>JSON.parse(localStorage.getItem('user'));
    return parseInt(user.id)
  }

  addGuild(body){
    return this.http.post('http://localhost:4000/guilds/register', body);
  }
  
  getAllGuilds(){
    return this.http.get('http://localhost:4000/guilds');
  }
}
