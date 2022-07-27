import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim='Your Perfect Banking Partner'
  account ='please enter account number'
  

  //to hold account number
  acno=""
  //to hold password
  pswd=""



  //database
  userDetails:any ={
    1000:{acno:1000,username:'Neer',password:1000, balance:5000},
    1001:{acno:1001,username:'Laisha',password:1001, balance:6000},
    1002:{acno:1002,username:'vyom',password:1002, balance:4000}
  }

  //constructor
  constructor(private router:Router, private ds:DataService) { }

  //life cycle hook -angular
  ngOnInit(): void {
  }


  //user defined functions

  //login

  login (){
   var acno= this.acno
   var pswd=this.pswd

   //calling login -dataservice
   const result= this.ds.login(acno,pswd)

   if(result){
    alert("Login successful")
    this.router.navigateByUrl('dashboard')
   }
  

  } 



}
