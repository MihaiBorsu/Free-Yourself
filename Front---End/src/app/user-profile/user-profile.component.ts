import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../services/upload-image.service';
import { showNotification } from '../helpers/notification'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imageUrl: string = "/assets/img/angular.png";
  fileToUpload: File = null;

  constructor(private imageService : UploadImageService) { }

  ngOnInit() {
    showNotification('top','right', 'Are you good enough?')
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Caption,Image){
    console.log(Caption.value)
    console.log(this.fileToUpload)
   this.imageService.postFile(Caption.value,this.fileToUpload).subscribe(
     data =>{
       console.log('done');
       Caption.value = null;
       Image.value = null;
       this.imageUrl = "/assets/img/default-image.png";
     }
   );
  }
}
