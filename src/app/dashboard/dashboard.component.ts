import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  user = ""

  // acno=""
  // pswd=""
  // amount=""

  // acno1=""
  // pswd1=""
  // amount1=""



  //Deposit model
  depositForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })


  //withdraw model
  withdrawForm = this.fb.group({

    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  //acno to child
  acno: any

  lDate: any


  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('CurrentUser') || '')
    this.lDate = new Date()
  }

  ngOnInit(): void {


    // if(!localStorage.getItem('currentAcno')){

    //   alert('Please login')

    //   this.router.navigateByUrl('')
    // }
  }

  //Deposit
  
  deposit(){

    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if(this.depositForm.valid){
     this.ds.deposit(acno,pswd,amount)
     .subscribe(
      (result:any)=>{
        alert(result.message)
      },
      result=>{
        alert(result.error.message)
      }
    )   
    }
    else{
      alert('Invalid Form')
    }
    

  }


  //WithDraw
  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amount = this.withdrawForm.value.amount1


    const result = this.ds.withdraw(acno, pswd, amount)

    if (this.withdrawForm.valid) {
      if (result) {
        alert(`${amount} Debited Success Fully And New Balance Is ${result} `)
      }

    }
    else {
      alert("Invaild Withdraw Form")
    }
  }


  //logout

  logout() {
    //remove login ACno & username

    localStorage.removeItem('currentAcno')
    localStorage.removeItem('CurrentUser')

    this.router.navigateByUrl('')

  }


  deleteParent() {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }


  //Cancel to set da

  cancel() {

    this.acno = ""
  }
}