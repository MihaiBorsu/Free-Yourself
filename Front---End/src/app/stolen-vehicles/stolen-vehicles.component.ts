import { Component, OnInit } from '@angular/core';
import { showNotification } from '../helpers/notification'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-stolen-vehicles',
  templateUrl: './stolen-vehicles.component.html',
  styleUrls: ['./stolen-vehicles.component.css']
})
export class StolenVehiclesComponent implements OnInit {
  vehicles: {}

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getVehicles().subscribe(
      res => {
        this.vehicles = res
        console.log(res)
        console.log("Working getVehicle")
        showNotification('top','center', 'Lets go hunting')
      }, err => {
        console.log("Error at getVehicle")
      }
    )
    
  }

}
