import { Component, OnInit } from '@angular/core';
import { showNotification } from '../helpers/notification'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  guilds: any
  users: any
  guildsSize: number
  usersSize: number

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getGuilds().subscribe(
      res => {       
        this.guilds = res
   
        let count = 1
        for(let result of this.guilds){
          result['rank']=count
          count += 1
       }

       this.guilds = this.guilds.slice(0, 3)

        // showNotification('top','center', 'Between Titans')
      }, err => {
        console.log("Error at getGuilds")
      }
    )

    this.userService.getUserRanking().subscribe(
      res => {
        this.users = res
        let count = 1
        for(let result of this.users){
          result['rank']=count
          count += 1
       }
       this.users = this.users.slice(0, 5)
        this.usersSize = Object.keys(res).length
        showNotification('bottom','left', 'Between Titans')
      }, err => {
        console.log("Error at getGuilds")
      }
    )
    
  }

}
