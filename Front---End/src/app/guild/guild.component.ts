import { Component, OnInit } from '@angular/core';
import { showNotification } from '../helpers/notification'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {
  guild: {}
  users: {}

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getGuild(2).subscribe(
      res => {
        this.guild = res
        console.log(res)
        console.log("Working getGuild")
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



    showNotification('top','center', 'Together we are stronger!!!')
  }

}
