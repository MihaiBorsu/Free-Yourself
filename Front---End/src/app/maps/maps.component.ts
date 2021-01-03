import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { showNotification } from '../helpers/notification'
import { XpService } from "../services/xp.service";
import { Router } from '@angular/router';
import * as turf  from '@turf/along';
// import  turf  from '@turf/turf';
import * as turfkm from '@turf/distance'

import * as invariant_1 from '@turf/invariant'
import * as helpers_1 from '@turf/helpers'
import { interval, Subscription } from "rxjs";


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})


export class MapsComponent implements OnInit {

    map: mapboxgl.Map
    totalDistance: any
    intervalId: number;
    subscription: Subscription;
    count:number
    currentPosition: any

        constructor(private xpService:XpService) { }

        ngOnInit() {
          this.currentPosition = navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            console.log(typeof position.coords.latitude)
            let lat = position.coords.latitude
            let long = position.coords.longitude

            Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken)
            this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lat, long],
            zoom: 12
            });

            let point1 = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [46.1937, 21.3043]
                }
              };
              let point2 = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [46.1897, 21.3216]
                }
              };
              let point3 = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [46.1811, 21.3218]
                }
              };
              let point4 = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [46.1831, 21.3099]
                }
              };
              let point5 = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [46.1916, 21.3103]
                }
              };
              let units = "kilometers";
              
              let points = {
                "type": "FeatureCollection",
                "features": [point1, point2]
              };
              
              console.log(this.xpService.distance(point1, point2, units));
              console.log(this.xpService.distance(point2, point3, units));

              //=points
              
               this.totalDistance = this.xpService.distance(point1, point2, units);
               this.totalDistance = this.totalDistance + this.xpService.distance(point2, point3, units);
               this.totalDistance = this.totalDistance + this.xpService.distance(point3, point4, units);
               this.totalDistance = this.totalDistance + this.xpService.distance(point4, point5, units);


              console.log("Distance is: ")
              console.log(this.totalDistance)

              this.count = 1
         
              //  const source = interval(1000);
              //  const text = "Your Text Here";
              //  this.subscription = source.subscribe(val => this.display(text));
            });
        }

    finishWorkout(){
        this.xpService.stopWorkout(this.totalDistance)
    }

    display(str){
      this.count = this.count + 1;
      console.log(str + " " + this.count);
    }

    getPosition() {
      return navigator.geolocation.getCurrentPosition((position) => {
        return position;
      });
    }


}
