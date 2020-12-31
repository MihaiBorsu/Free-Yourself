import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class XpService {

  constructor(private router: Router,
    private http:HttpClient) { }

  setCurrentWorkout(activity){
    let check = localStorage.getItem('workout')
    if(check != null){
      console.log("You have to stop your activity before starting another one!")
    } else {
      localStorage.setItem('workout', activity)
      console.log("Good luck with: " + activity)
    }
    this.router.navigate(['/maps']);

  }

  stopWorkout(distance){
    //if km take care of 1.45 or use meters
    let activity = localStorage.getItem('workout')
    let xp = 0
    switch(activity) { 
      case 'walk': { 
        xp = distance * 14; 
         break; 
      } 
      case 'jogging': { 
        xp = distance * 12; 
         break; 
      }
      case 'run': { 
        xp = distance * 10;  
         break; 
      } 
      case 'bike': { 
        xp = distance * 3;  
         break; 
      } 
      case 'skateboard': { 
        xp = distance * 7;  
         break; 
      } 
      case 'rolls': { 
        xp = distance * 6;  
         break; 
      } 
      default: { 
        xp = 0; 
         break; 
      } 
   } 
   if(xp == 0){
    console.log("error XP is 0")
   }
   

   this.sendWorkout(xp).subscribe(
     res => {
      localStorage.removeItem('workout');
      console.log(xp)
      this.router.navigate(['/']);
     }, err =>{
      console.log("error at workout")
     }
   )
  
  }

  sendWorkout(xp){
    let user = JSON.parse(localStorage.getItem('user'));
    let req = {
      userId: user.id,
      XP : xp
    }
    console.log(req)
     return this.http.post('http://localhost:4000/workouts/register', req);
  }
}
