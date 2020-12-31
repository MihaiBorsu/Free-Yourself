import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { showNotification } from '../helpers/notification'
import { XpService } from "../services/xp.service";
import { Router } from '@angular/router';
import * as turf  from '@turf/along';
// import  turf  from '@turf/turf';

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

    map: mapboxgl.Map
    distance: any

        constructor(private xpService:XpService) { }
        ngOnInit() {
            Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken)
            this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [2.3399, 48.8555],
            zoom: 12
            });
        }

    finishWorkout(){
        // console.log(parseInt(this.distance))
        this.xpService.stopWorkout(this.distance)
    }








    // map: mapboxgl.Map;
    // geojson: GeoJSON.FeatureCollection<any>
    // // linestring: {type: string,
    // //             geometry: { type: string,
    // //                          coordinates: number[]
    // //                         }
    // //         }
    // linestring: {}
    // // distanceContainer: any
    // // distance: ''

    // constructor() { }
    // ngOnInit() {
    //     Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);

    // this.map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [2.3399, 48.8555],
    //     zoom: 12
    //     });

    // console.log("-3")
    // this.geojson = {
    //     type: 'FeatureCollection',
    //     features: []
    //   };
    //   console.log("-2")
    // // this.geojson = {
    // //     'type': 'FeatureCollection',
    // //     'features': []
    // //     };
    // console.log("-1")
    //     this.linestring = {
    //         'type': 'Feature',
    //         'geometry': {
    //             'type': 'LineString',
    //             'coordinates': []
    //         }
    //     }
    //     console.log("-0")

    //     setTimeout(() => {
    //         console.log('hi');
    //         this.initializeMap()
    //       }, 3000);

    // }

    // initializeMap(){
    //     let _this = this
    //     console.log("1")
    //     _this.map.addSource('geojson', {
    //         'type': 'geojson',
    //         'data': _this.geojson
    //         });
    //         console.log("2")
    //         // Add styles to the map
    //     _this.map.addLayer({
    //         id: 'measure-points',
    //         type: 'circle',
    //         source: 'geojson',
    //         paint: {
    //         'circle-radius': 5,
    //         'circle-color': '#000'
    //     },
    //         filter: ['in', '$type', 'Point']
    //     });
    //     console.log("3")

    //     _this.map.addLayer({
    //         id: 'measure-lines',
    //         type: 'line',
    //         source: 'geojson',
    //         layout: {
    //         'line-cap': 'round',
    //         'line-join': 'round'
    //         },
    //         paint: {
    //         'line-color': '#000',
    //         'line-width': 2.5
    //         },
    //         filter: ['in', '$type', 'LineString']
    //         });
    //         console.log("4")
       
    //         _this.map.on('click', e => {
    //             var features = _this.map.queryRenderedFeatures(e.point, {
    //             layers: ['measure-points']
    //             });
    //             console.log("features")
    //             console.log(features)
    //             console.log("5")
    //             // Remove the linestring from the group
    //             // So we can redraw it based on the points collection
    //             if (_this.geojson.features.length > 1) _this.geojson.features.pop();
    //             console.log("6")
    //             // Clear the Distance container to populate it with a new value
    //             // distanceContainer.innerHTML = '';
                 
    //             // If a feature was clicked, remove it from the map
    //             if (features.length) {
    //                 console.log("7")
    //             var id = features[0].properties.id;
    //             _this.geojson.features = _this.geojson.features.filter(function (point) {
    //                 return point.properties.id !== id;
    //             });
    //             } else {
    //                 console.log("8")
    //             let point = {
    //                 'type': 'Feature',
    //                 'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [e.lngLat.lng, e.lngLat.lat]
    //                 },
    //                 'properties': {
    //                 'id': String(new Date().getTime())
    //                 }
    //             };
                 
    //             // _this.geojson.features.push(point.geometry.coordinates);
    //             }
                 
    //             // if (_this.geojson.features.length > 1) {
    //             //     _this.linestring.geometry.coordinates = _this.geojson.features.map(
    //             // p =>  {
    //             // return point.geometry.coordinates;
    //             // }
    //             // );
                 
    //             // geojson.features.push(linestring);
                 
    //             // // Populate the distanceContainer with total distance
    //             // var value = document.createElement('pre');
    //             // value.textContent =
    //             // 'Total distance: ' +
    //             // turf.length(linestring).toLocaleString() +
    //             // 'km';
    //             // distanceContainer.appendChild(value);
    //             // }
                 
    //             // map.getSource('geojson').setData(geojson);
    //         });
                
    // }

    // getCurrentMap(){
    //     return this.map
    // }

    // moveMap(){
    //     this.map.on('mousemove', e => {
    //         console.log("a")
    //         var features = this.map.queryRenderedFeatures(e.point, {
    //         layers: ['measure-points']
    //         });
    //         console.log("b")
    //         // UI indicator for clicking/hovering a point on the map
    //         this.map.getCanvas().style.cursor = features.length
    //         ? 'pointer'
    //         : 'crosshair';
    //         });
    // }



















    // map: mapboxgl.Map;
    // geojson: GeoJSON.FeatureCollection<any>
    // linestring: {}
    // distanceContainer: any
    // distance: ''

    // constructor() { }
    // ngOnInit() {
    //     Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);

    // this.map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [2.3399, 48.8555],
    //     zoom: 12
    //     });
    // console.log("-3")
    // this.geojson = {
    //     type: 'FeatureCollection',
    //     features: []
    //   };
    //   console.log("-2")
    // // this.geojson = {
    // //     'type': 'FeatureCollection',
    // //     'features': []
    // //     };
    // console.log("-1")
    //     this.linestring = {
    //         'type': 'Feature',
    //         'geometry': {
    //         'type': 'LineString',
    //         'coordinates': []
    //         }
    //     }
    //     console.log("-0")

    //     setTimeout(() => {
    //         console.log('hi');
    //         this.initializeMap()
    //       }, 5000);

    
    // }

    // initializeMap(){
        
    //     console.log("1")
    //     this.map.addSource('geojson', {
    //     'type': 'geojson',
    //     'data': this.geojson
    //     });
    //     console.log("2")
    //     // Add styles to the map
    //     this.map.addLayer({
    //         id: 'measure-points',
    //         type: 'circle',
    //         source: 'geojson',
    //         paint: {
    //         'circle-radius': 5,
    //         'circle-color': '#000'
    //         },
    //         filter: ['in', '$type', 'Point']
    //     });
    //     console.log("3")
    //     this.map.addLayer({
    //         id: 'measure-lines',
    //         type: 'line',
    //         source: 'geojson',
    //         layout: {
    //         'line-cap': 'round',
    //         'line-join': 'round'
    //         },
    //         paint: {
    //         'line-color': '#000',
    //         'line-width': 2.5
    //         },
    //         filter: ['in', '$type', 'LineString']
    //     });
    //     console.log("4")
    //     // onclick(e){
    //     console.log(this.map)
    //         this.map.on('click', e => {
    //             console.log(this.map)
    //             var features = this.getCurrentMap().queryRenderedFeatures(e.point, {
    //             // var features = this.map.queryRenderedFeatures(e.point, {
    //             layers: ['measure-points']
    //             });
    //            console.log("5")   
    //             // Remove the linestring from the group
    //             // So we can redraw it based on the points collection
    //             if (this.geojson.features.length > 1) this.geojson.features.pop();
    //             console.log("6")
    //             // Clear the Distance container to populate it with a new value
    //             // this.distanceContainer.innerHTML = '';
    //             this.distance = '';
    //             console.log("7")
    //             // If a feature was clicked, remove it from the map
    //             if (features.length) {
    //             var id = features[0].properties.id;
    //             this.geojson.features = this.geojson.features.filter(p => {
    //             return point.properties.id !== id;
    //             });
    //             } else {
    //                 console.log("8")
    //             let point = {
    //             'type': 'Feature',
    //             'geometry': {
    //             'type': 'Point',
    //             'coordinates': [e.lngLat.lng, e.lngLat.lat]
    //             },
    //             'properties': {
    //             'id': String(new Date().getTime())
    //             }
    //             };
                 
    //             this.geojson.features.push(point);
    //             }
    //             console.log("9")
    //             if (this.geojson.features.length > 1) {
    //                 this.linestring.geometry.coordinates = this.geojson.features.map(
    //             p => {
    //             return point.geometry.coordinates;
    //             }
    //             );
                 
    //             this.geojson.features.push(this.linestring);
    //             console.log("10")
    //             // Populate the distanceContainer with total distance
    //             var value = document.createElement('pre');
    //             value.textContent = 'ok'
    //             // value.textContent = 'Total distance: ' + turf.length(this.linestring).toLocaleString() + 'km';
    //             // this.distanceContainer.appendChild(value);
    //             this.distance = value
    //             }
    //             console.log("11")
    //         const source: mapboxgl.GeoJSONSource = this.map.getSource('geojson') as mapboxgl.GeoJSONSource
    //         source.setData(JSON.stringify(this.geojson))
           
            
                
    //     });
    // }

    // getCurrentMap(){
    //     return this.map
    // }

    // moveMap(){
    //     this.map.on('mousemove', e => {
    //         console.log("a")
    //         var features = this.map.queryRenderedFeatures(e.point, {
    //         layers: ['measure-points']
    //         });
    //         console.log("b")
    //         // UI indicator for clicking/hovering a point on the map
    //         this.map.getCanvas().style.cursor = features.length
    //         ? 'pointer'
    //         : 'crosshair';
    //         });
    // }

}
