import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-app',
  templateUrl: './form-app.component.html',
  styleUrls: ['./form-app.component.css']
})
export class FormAppComponent implements OnInit {

  // customerForm = new FormGroup({
  //   contactNumber : new FormControl('', Validators.required),
  //   cccc : new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   typeOfPhoto : new FormControl('', Validators.required),
  //   quantity : new FormControl('', Validators.required),
  //   expDelDate : new FormControl('', Validators.required),
  //   totalAmount : new FormControl('', Validators.required),
  //   advance : new FormControl('', Validators.required),
  //   due : new FormControl(''),
  //   file : new FormControl('', Validators.required),
  // })

  minDate = new Date();
  maxDate = new Date(2030,12,31);

  

  customerForm = this.formBuilder.group({
    contactNumber : ['', [Validators.required, Validators.pattern("(9|8|7|6)([0-9]{9})")]],
    customerName :  ['', [Validators.required, Validators.minLength(3)]],
    typeOfPhoto : ['', Validators.required],
    quantity : ['', Validators.required],
    expDelDate : ['', Validators.required],
    totalAmount : ['', [Validators.required, Validators.pattern("[0-9]{1,4}")]],
    advance : ['', Validators.required],
    due : [''],
    file : ['', Validators.required]
  })
  

  userFile : any = File;

  orderId : string;

  orderImage : any;

  image : any;

  advAmountErrorMsg : string;

  advAmountError : boolean = false;

  amount : number;
  advAmount : number;



  constructor(private _http : HttpClient, private formBuilder : FormBuilder) { }

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

  submitForm() {
    console.log('Form Submitted');
    console.log(this.customerForm.value);
    console.log(this.customerForm.get('typeOfPhoto').value);
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

  get contactNumber() {
    return this.customerForm.get('contactNumber');
  }

  get customerName() {
    return this.customerForm.get('customerName');
  }

  get typeOfPhoto() {
    return this.customerForm.get('typeOfPhoto');
  }

  get quantity() {
    return this.customerForm.get('quantity');
  }
  get expDelDate() {
    return this.customerForm.get('expDelDate');
  }
  get totalAmount() {
    return this.customerForm.get('totalAmount');
  }
  get advance() {
    return this.customerForm.get('advance');
  }
  get file() {
    return this.customerForm.get('file');
  }
}
