import { Component, OnInit } from '@angular/core';
import { showNotification } from '../helpers/notification'

@Component({
  selector: 'app-stolen-vehicles',
  templateUrl: './stolen-vehicles.component.html',
  styleUrls: ['./stolen-vehicles.component.css']
})
export class StolenVehiclesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    showNotification('top','center', 'Lets go hunting')
  }

}
