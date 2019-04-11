import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {
  myForm = null;
  myData = {} as {};

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) { 
    this.myForm = _formBuilder.group({
      to: [null,Validators.compose([Validators.required])],
      title: [null],
      message: [null]
    })
  }

  ngOnInit() {
  }

  send() {
    this.myData.to = this.myForm.to
    this.myData.title = this.myForm.title;
    this.myData.message = this.myForm.message;
    console.log(this.myData)
    const options = {
      port: 80,
      method: 'POST',
      headers: {}
    };
    this.http.post('http://localhost:5000/sendMail',this.myData,options).subscribe(res =>{
      console.log('+++',res)
    })
  }
}
