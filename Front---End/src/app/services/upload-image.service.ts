import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http : HttpClient) { }

  // postFile(caption: string, fileToUpload: File) {
  //   const endpoint = 'http://localhost:28101/api/UploadImage';
  //   const formData: FormData = new FormData();
  //   formData.append('Image', fileToUpload, fileToUpload.name);
  //   formData.append('ImageCaption', caption);

  //   console.log(formData)
    
  //   return this.http
  //     .post(endpoint, formData);
  // }

  postFile(fileToUpload: File) {
    let user = <User>JSON.parse(localStorage.getItem('user'));
    let caption = user.id
    
    const endpoint = 'http://localhost:28101/api/UploadImage';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);

    console.log(formData)
    
    return this.http.post(endpoint, formData);
  }
}
