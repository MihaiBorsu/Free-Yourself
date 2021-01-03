import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
import * as invariant_1 from '@turf/invariant'
import * as helpers_1 from '@turf/helpers'

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
    console.log("XPServiceArrive" + distance)
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
   
   console.log("FInal XP " + xp)
   xp = Math.floor( xp )
   console.log("Final Xp smaller " + xp)

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

  distance(from, to, options) {
    if (options === void 0) { options = {}; }
    var coordinates1 = invariant_1.getCoord(from);
    var coordinates2 = invariant_1.getCoord(to);
    var dLat = helpers_1.degreesToRadians((coordinates2[1] - coordinates1[1]));
    var dLon = helpers_1.degreesToRadians((coordinates2[0] - coordinates1[0]));
    var lat1 = helpers_1.degreesToRadians(coordinates1[1]);
    var lat2 = helpers_1.degreesToRadians(coordinates2[1]);
    var a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    return helpers_1.radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
  }

  getPosition() {
    return navigator.geolocation.getCurrentPosition((position) => {
      return position;
    });
  }

    getInterval(){
      let activity = localStorage.getItem('workout')
      let time = 0
      switch(activity) { 
        case 'walk': { 
          time = 10000
          break; 
        } 
        case 'jogging': { 
          time = 9000 
          break; 
        }
        case 'run': { 
          time = 8000  
          break; 
        } 
        case 'bike': { 
          time = 3000  
          break; 
        } 
        case 'skateboard': { 
          time = 6000 
          break; 
        } 
        case 'rolls': { 
          time = 5000   
          break; 
        } 
        default: { 
          time = 0   
          break; 
        } 
    }
    return time
  }
}
