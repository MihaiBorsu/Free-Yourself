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
    

    arrayOfCoordinates: {
            type: string,
            properties: {},
            geometry: {
              type: string,
              coordinates: number[]
            }
         }[]

        //  arrayOfCoordinates:any
    

      lat: any
      long: any
      counting: any

        constructor(private xpService:XpService) { }

        ngOnInit() {
          let _this = this

          this.arrayOfCoordinates = []

          this.totalDistance = 0

          this.getCurrentLocationInitial()

          let time = this.xpService.getInterval()
          console.log("Waiting time: " + time)
          const source = interval(time);
          this.subscription = source.subscribe(val => this.getCurrentLocation());

        }

    finishWorkout(){
      this.computeDistance(this.arrayOfCoordinates, "kilometers")
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

    getCurrentLocation(){
      let _this = this
      navigator.geolocation.getCurrentPosition((position) => {
        _this.counting = _this.counting + 1
        _this.lat = position.coords.latitude.toFixed(4)
        _this.long = position.coords.longitude.toFixed(4)


        let point = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [_this.lat, _this.long]
          }
        }
       _this.arrayOfCoordinates.push(point)

      });
    }

    getCurrentLocationInitial(){
      let _this = this
      navigator.geolocation.getCurrentPosition((position) => {
        _this.counting = 1
        _this.lat = position.coords.latitude.toFixed(4)
        _this.long = position.coords.longitude.toFixed(4)

        // _this.setMap(_this)
        Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken)

        _this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [_this.long, _this.lat],
            zoom: 12
            });
      });
    }

    setRoute(){
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
                "features": [point1, point2, point3, point4, point5]
              };

              this.computeDistance(points.features, units)
    }

    computeDistance(pointArr, unit){
        
      console.log(pointArr)

      for(let i=1; i< pointArr.length; i++){
        this.totalDistance = this.totalDistance + this.xpService.distance(pointArr[i-1], pointArr[i], unit);
      }

      this.xpService.stopWorkout(this.totalDistance)

    }
}
