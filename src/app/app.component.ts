import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, FormArray} from '@angular/forms';
import { FormBuilder, Validators, Validator} from '@angular/forms';
import { usernamevalidator } from './shared/username-test';
import { passwordvalidator } from './shared/password-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Reactive-Forms';
 /*
  registrationForm = new FormGroup({
    username:new FormControl('Karthik'),
    password: new FormControl(''),
    confirmpassword : new FormControl(''),
    address : new FormGroup({
       city:new FormControl(''),
       state: new FormControl(''),
       pcode : new FormControl('')
    })
  });
  */

registrationForm:FormGroup;

constructor(private fb:FormBuilder){}

ngOnInit(){
  this.registrationForm=this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),usernamevalidator]],
    email:[],
    subscribe:[false],
    password:[''],
    confirmpassword:[''],
    address:this.fb.group({
      city:[''],
      state:[''],
      pcode:['']
    }),
    alternateEmail:this.fb.array([])
  },{Validator:passwordvalidator});

  this.registrationForm.get('subscribe').valueChanges.subscribe(checked=>{
    const email = this.registrationForm.get('email');
        if(checked){
          email.setValidators(Validators.required);
        }
        else{
          email.clearValidators();
        }
          email.updateValueAndValidity();
       });
}
 
get userName(){
    return this.registrationForm.get('username');
}

get email(){
    return this.registrationForm.get('email');
}

get alternateEmail(){
  return this.registrationForm.get('alternateEmail') as FormArray;
}

addalternateEmail(){
  this.alternateEmail.push(this.fb.control(''));
}

submitForm(){
  console.log(this.registrationForm.value);
  alert(this.registrationForm.value);
}

loadApiData(){
    this.registrationForm.setValue({
       username:'karthik',
       password: 'war',
       email:'gr.karthik065@gmail.com',
       subscribe:true,
       confirmpassword : 'war',
       address : {
       city:'Mysuru',
       state: 'Karnataka',
       pcode : '570002'
      },
      alternateEmail:''
   });
  }
}
