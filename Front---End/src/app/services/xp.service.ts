import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class XpService {

  constructor(private router: Router) { }

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
      case 'running': { 
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
   console.log(xp)
  }
}
