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
  // newGuild: {
  //   leaderUsername: string,
  //   name: string,
  //   city: string,
  //   country: string,
  //   totalXP: number
  // }

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.inGuild = false
    this.createGuildBool = false
    // this.city = ''
    // this.country = ''
    // this.name = ''

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
                console.log(res)
                console.log("Working getGuild")
                // showNotification('top','center', 'Between Titans')
              }, err => {
                console.log("Error at getGuilds")
              }
            )
        
            this.userService.getUsersInGuild(this.userGuildId).subscribe(
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

      }, err => {
        console.log("Error at getGuilds")
      }
    )

    



    showNotification('top','center', 'Together we are stronger!!!')
  }

  setGuild(guildId){
    if(guildId == null){
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
    // this.newGuild.totalXP = 0
    // console.log(this.newGuild)

    // this.newGuild.leaderUsername = this.user.username
    console.log("GGGIDSODSODOS    " + this.newGuild)

    let _this = this
    this.userService.addGuild( this.newGuild).subscribe(
      res => {     
        console.log(res)
        console.log("Working added Guild")

      
        console.log(res)
        _this.user.guildId = res
        _this.userService.updateProfile(_this.user).subscribe(
          res => {     
            console.log(res)
            console.log("Working added Guild")
          }, err => {
            console.log("Updating USer from guild failed added Guild")
          })
        
        
        
      }, err => {
        console.log("Error at adding Guilds")
      }
    )
  }

}

