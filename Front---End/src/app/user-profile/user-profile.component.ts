

import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../services/upload-image.service';
import { showNotification } from '../helpers/notification'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imageUrl: string = "/assets/img/angular.png";
  fileToUpload: File = null;
  user: any
  encodedImg: any
  updateUserProfile: boolean
  cars: any
  guildList: any

  constructor(private imageService : UploadImageService,
              private userService : UserService) { }

  ngOnInit() {
    this.updateUserProfile = false
    this.cars = ['Volvo', 'Auid', 'BMW']

    this.user = {
      username: '',
      country: '',
      city: '',
      description: '',
      phoneNumber: '',
      email: '',
      guildId: '',
    }

    this.userService.getProfile().subscribe(
      res => {
        this.user = res
        if(this.user.guildId == null){
          this.user.guildId = "Choose a Guild"
        }

        this.userService.getAllGuilds().subscribe( 
          res => {
            this.guildList = res
            // console.log( this.guildList)
          }, err => {
            console.log("Error at getGuilds from User-Profile")
          }
        )

        showNotification('bottom','left', 'Is your profile good enough?')
      }, err => {

      }
    )
   
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    let _this=this
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = function () {
      // _this.user.photo = reader.result
      _this.setencodedImg(reader.result)
    };
  }

  setencodedImg(encoded){
    console.log(encoded);
  }

  setUpdateUserProfile(str){
    if(str){
      console.log('true')
      this.updateUserProfile = true
    } else {
      console.log('false')
      this.updateUserProfile = false
    }
  }

  OnSubmit(Image){
    console.log(this.fileToUpload)
    let _this=this
   this.imageService.postFile(this.fileToUpload).subscribe(
     data =>{
       console.log('done');
       Image.value = null;
       this.imageUrl = "/assets/img/default-image.png";
       _this.updateUserProfile = false
     }
   );
  }

  update(){
    this.userService.updateProfile(this.user).subscribe(res => {
      showNotification('top','center', 'User Profile updated!')
    }, err => {
      console.log("Error at updating profile")
    }) 
  }

  changeGuild(id){
    this.user.guildId = id
  }
}
