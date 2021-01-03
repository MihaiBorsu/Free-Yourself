

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

  constructor(private imageService : UploadImageService,
              private userService : UserService) { }

  ngOnInit() {
    this.updateUserProfile = false
    this.userService.getProfile().subscribe(
      res => {
        console.log("Hello")
        console.log(res)
        this.user = res
        showNotification('top','center', 'Are you good enough?')
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

  // OnSubmit(Caption, Image){
  //   console.log(Caption.value)
  //   console.log(this.fileToUpload)
  //  this.imageService.postFile(Caption.value,this.fileToUpload).subscribe(
  //    data =>{
  //      console.log('done');
  //      Caption.value = null;
  //      Image.value = null;
  //      this.imageUrl = "/assets/img/default-image.png";
  //    }
  //  );
  // }

  
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
    this.user.guildId = parseInt(this.user.guildId)
    this.userService.updateProfile(this.user).subscribe(res => {
      showNotification('top','left', 'Update worked?')
    }, err => {
      console.log("Error at updating profile")
    }) 
  }
}
