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
  inGuild:boolean
  user: any
  createGuildBool: boolean
  newGuild: any
  name: any
  country: any
  city: any

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.inGuild = false
    this.createGuildBool = false
    this.guild = {
      name: '',
      leaderUsername: ''
    }

    this.newGuild= {
      leaderUsername: '',
      name: '',
      city: '',
      country: '',
      totalXP: 0
    }

    let _this = this

    this.userService.getProfile().subscribe(
      res => {
        this.user = res
        this.userGuildId = this.user.guildId

        this.setGuild(this.userGuildId)

        if(this.inGuild){


            this.userService.getGuild(this.userGuildId).subscribe(
              res => {
                this.guild = res
                // showNotification('top','center', 'Between Titans')
              }, err => {
                console.log("Error at getGuilds")
              }
            )
        
            this.userService.getUsersInGuild(this.userGuildId).subscribe(
              res => {
                this.users = res
                showNotification('top','center', 'Between Titans')
              }, err => {
                console.log("Error at getGuilds")
              }
            )
        } 
        showNotification('bottom','left', 'Together we are stronger as a Guild!')
      }, err => {
        console.log("Error at getGuilds")
      }
    )

  }

  setGuild(guildId){
    if(guildId == null || guildId == 0){
      this.inGuild = false
    } else{
      this.inGuild = true
    }
  }

  displayGuildCreate(){
    this.createGuildBool = true
  }

  cancelAddingGuild(){
    this.createGuildBool = false
  }
  
  addGuild(){
    
    this.newGuild.leaderUsername = this.user.username

    let _this = this
    console.log(this.newGuild)
    this.userService.addGuild( this.newGuild).subscribe(
      res => {     
        showNotification('top','center', 'Guild registered')
        _this.user.guildId = res
        _this.userService.updateProfile(_this.user).subscribe(
          res => {     
          }, err => {
            console.log("Updating USer from guild failed added Guild")
          })
        
        
        
      }, err => {
        console.log("Error at adding Guilds")
      }
    )
  }

  removeFromGuild(){
    this.user.guildId = 0
    this.userService.updateProfile(this.user).subscribe(
      res => {     
      }, err => {
        console.log("Updating USer from guild failed but worked added Guild")
        this.inGuild = false
      })
  }

}

