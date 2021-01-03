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
  stolenVehicle: {}
  register: boolean
  update: boolean
  updateStolenVehicle: {}
  userId: number

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  this.userId = this.userService.getUserId();

    this.register = false
    this.update = false
    
    this.stolenVehicle = {    serialNumber: '',
                              profileContact: '',
                              date: '',
                              city: '',
                              country: '',
                              userId: '',
                              type:'',
                              photoLink: ''
  }
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

  addStolenVehicle(){
    this.register = true
  }

  cancelAddingVehicle(){
    this.ngOnInit();
  }

  registerVehicle(){
    this.userService.registerVehicle(this.stolenVehicle).subscribe(
    res => {
      this.vehicles = res
      console.log(res)
      console.log("Working getVehicle")
      showNotification('top','center', 'Lets go hunting')
      this.ngOnInit();
    }, err => {
      console.log("Error at getVehicle")
    })
  }

  updateObject(vehicle){
    this.update = true
    this.updateStolenVehicle = vehicle
  }

  updateVehicle(id){
    this.userService.updateVehicle(id, this.updateStolenVehicle).subscribe(
      res => {
        console.log(res)
        console.log("Working getVehicle")
        showNotification('top','center', 'Updated succesfully')
        this.ngOnInit();
      }, err => {
        console.log("Error at getVehicle")
      })
    console.log(id)
  }

  deleteVehicle(id){
      this.userService.deleteVehicle(id).subscribe(
        res => {
          console.log(res)
          console.log("Working getVehicle")
          showNotification('top','center', 'Deleted succesfully')
          this.ngOnInit();
        }, err => {
          console.log("Error at getVehicle")
        })
  }

  checkIfMine(vehicleUserId){
    if(parseInt(vehicleUserId) == this.userId){
      return true
    } else{
      return false
    }
  }

}
