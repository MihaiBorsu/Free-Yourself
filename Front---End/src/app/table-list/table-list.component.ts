import { Component, OnInit } from '@angular/core';
import { showNotification } from '../helpers/notification'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  guilds: {}
  users: {}

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getGuilds().subscribe(
      res => {
        this.guilds = res
        console.log(res)
        console.log("Working getGuilds")
        // showNotification('top','center', 'Between Titans')
      }, err => {
        console.log("Error at getGuilds")
      }
    )

    this.userService.getUserRanking().subscribe(
      res => {
        this.users = res
        console.log(res)
        console.log("Working getUserRanking")
        showNotification('top','center', 'Between Titans')
      }, err => {
        console.log("Error at getGuilds")
      }
    )
    
  }

}
