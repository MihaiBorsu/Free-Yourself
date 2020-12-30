import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { showNotification } from '../helpers/notification'
import { XpService } from "../services/xp.service";
import { Router } from '@angular/router';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = 37.75;
    lng = -122.41;
    constructor(private xpService: XpService,
                private router: Router,) { }
    ngOnInit() {
        showNotification('top','center', 'You cannot hide...')

        Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);

        this.getLocation();
    }

     getLocation(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setCoords(position.coords.latitude, position.coords.longitude);
                this.setMap();

            })
        }
    }

    setCoords(lat, lng){
        this.lat = lat;
        this.lng = lng;
    }

    setMap(){
        console.log(this.lat);
        console.log(this.lng);

            // mapboxgl.accessToken = environment.mapbox.accessToken;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: 13,
          center: [this.lng, this.lat]
      });
       // Add map controls
       this.map.addControl(new mapboxgl.NavigationControl());
    }

    stopWorkout(){
        this.xpService.stopWorkout(5)
        this.router.navigate(['/']);
    }

}
