import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//global headers
const options = {
  headers : new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //user name
  CurrentUser: any
  // type:any

  currentAcno:any



  // data base
  userDetails: any = {
    1000: { acno: 1000, username: 'Neer', password: 1000, balance: 5000,transaction:[]},
    1001: { acno: 1001, username: 'Laisha', password: 1001, balance: 6000,transaction:[] },
    1002: { acno: 1002, username: 'Vyom', password: 1002, balance: 4000,transaction:[] }
  }


  constructor( private http: HttpClient) {
    this.getDetails()
  }

  //to store data in local storage
  saveDetails(){

    //database

    if(this.userDetails){
      localStorage.setItem('userDetails',JSON.stringify(this.userDetails))
    }
//login username
    if(this.CurrentUser){
      localStorage.setItem('CurrentUser',JSON.stringify(this.CurrentUser))
    }
//login acno
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
  }

//to store data from local storage
  getDetails(){
    //database

    if(localStorage.getItem('userDetails')){
      this.userDetails=JSON.parse(localStorage.getItem('userDetails')||'')

    }

//login user
    if(localStorage.getItem('CurrentUser')){
      this.CurrentUser=JSON.parse(localStorage.getItem('CurrentUser')||'')

    }



    //login acno

    //login user
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'')

    }
  }


  //register
  register(acno: any, password: any, username: any) {
   const data ={ 
    acno, password, username
  }

  //register api -asynchronous

  return this.http.post('http://localhost:3000/register',data)
  }
  // login


  login(acno: any, pswd: any) {
   //req body
   const data={
    acno,pswd
   }
   //login api -asynchronous

   return this.http.post('http://localhost:3000/login',data)
  }
//to get the token attach it to its header
  getOptions(){
    //fetch tooken from local storage
const token =JSON.parse(localStorage.getItem('token')||'')
    //to get the header , create an object for HttpHeaders
    let headers =new HttpHeaders()
    //append token inside the header
    if(token){
      headers =headers.append('x-access-token',token)
      options.headers=headers
    }
    return options
  }


  //deposit
  deposit(acno: any, pswd: any, amt: any) {
     //req body
   const data={
    acno,pswd,amt
   }
   //login api -asynchronous

   return this.http.post('http://localhost:3000/deposit',data,this.getOptions())
  }








  //withdraw
  withdraw(acno: any, pswd: any, amt: any) {
    let userDetails = this.userDetails
    var amount = parseInt(amt)
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        if( userDetails[acno]['balance']>amount){
          userDetails[acno]['balance'] -= amount
          userDetails[acno]['transaction'].push({
            type:"DEBIT",
            amount
          })
          console.log(userDetails)
          this.saveDetails()
        return userDetails[acno]['balance']
        }
        else{alert("Insufficient balance")
      return false}
        
      }
      else {
        alert('Incorrect Password')
        return false
      }

    }
    else {
      alert('User Does not Exist')
      return false
    }
  }


  //transaction
  getTransaction(acno:any){
    return this.userDetails[acno]['transaction']
  }
}