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
  userGuildId: any
  noGuild:boolean

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.noGuild = false
    let _this = this
    this.userService.getProfile().subscribe(
      res => {
        
        this.userGuildId = res
        if(this.userGuildId != null){
        console.log("KOKOKP")
        console.log(this.userGuildId.guildId)

        this.userService.getGuild(this.userGuildId.guildId).subscribe(
          res => {
            this.guild = res
            console.log(res)
            console.log("Working getGuild")
            // showNotification('top','center', 'Between Titans')
          }, err => {
            console.log("Error at getGuilds")
          }
        )
    
        this.userService.getUsersInGuild(this.userGuildId.guildId).subscribe(
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
        else{
          _this.setGuild(false)
        }
      }, err => {
        console.log("Error at getGuilds")
      }
    )

    



    showNotification('top','center', 'Together we are stronger!!!')
  }

  setGuild(bool){
    this.noGuild = bool
  }

}

