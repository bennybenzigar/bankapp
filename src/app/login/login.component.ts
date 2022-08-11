import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim = 'Your Perfect Banking Partner'
  account = 'please enter account number'


  //to hold account number
  acno = ""
  //to hold password
  pswd = ""



  //register model
  loginForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


  //database
  userDetails: any = {
    1000: { acno: 1000, username: 'Neer', password: 1000, balance: 5000 },
    1001: { acno: 1001, username: 'Laisha', password: 1001, balance: 6000 },
    1002: { acno: 1002, username: 'vyom', password: 1002, balance: 4000 }
  }

  //constructor
  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  //life cycle hook -angular
  ngOnInit(): void {
  }


  //user defined functions

  //login

  login() {
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    if (this.loginForm.valid) {



      //calling login -dataservice
      this.ds.login(acno, pswd)
        .subscribe(
          (result: any)=>{
            localStorage.setItem('CurrentUser',JSON.stringify(result.CurrentUser))
            localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
            localStorage.setItem('token',JSON.stringify(result.token))



            alert("Login successful")
            this.router.navigateByUrl('dashboard')
          },
          result => {
            alert(result.error.message)
          }
        )
    }

    else {
      alert("Invalid")
    }

  }



}
