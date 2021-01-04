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
        showNotification('bottom','left', 'Lets go hunting in after Stolen Vehicles!')
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
      showNotification('top','center', 'Stolen Vehicle registered!')
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
        showNotification('top','center', 'Stolen Vehicle updated')
        this.ngOnInit();
      }, err => {
        console.log("Error at getVehicle")
      })
  }

  deleteVehicle(id){
      this.userService.deleteVehicle(id).subscribe(
        res => {
          showNotification('top','center', 'Stolen Vehicle deleted')
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
