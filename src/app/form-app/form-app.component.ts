import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-app',
  templateUrl: './form-app.component.html',
  styleUrls: ['./form-app.component.css']
})
export class FormAppComponent implements OnInit {

  userFile : any = File;

  orderId : string;

  orderImage : any;

  image : any;

  constructor(private _http : HttpClient) { }

  ngOnInit() {
  }

  onSelectFile(event) {
    const file = event.target.files[0];
   //console.log(file);
    this.userFile = file;
  }
  uploadFile() {
    console.log('*********** Upload File ****************');
   // console.log(this.userFile);
      const formData = new FormData;
      formData.append('file', this.userFile);
      console.log(formData.get('file'));
      console.log(formData);

      this._http.post('http://localhost:8081/upload', formData).subscribe((response) => {
          console.log('response');
          console.log(response);
      },
      (error) => {
          console.log('error');
          console.log(error);
      });
  }

  downloadOrder() {
    console.log('download order');
    console.log(this.orderId);
    this._http.get('http://localhost:8081/order/'+this.orderId).subscribe((response) => {
      console.log('order response');
      console.log(response);
      this.orderImage = response;
      this.image = this.orderImage.encodedBase64File;
      console.log('======================================');
      console.log(this.image);
    },
    (error) => {
      console.log('order error');
      console.log(error);

    })
  }
}
