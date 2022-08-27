import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  //login acno
  acno: any
  //to hold transaction array

  transaction: any

  constructor(private ds: DataService) {
    //get login acno from dataservice

    this.acno =JSON.parse( localStorage.getItem('currentAcno')||'')
    //get transaction array from dataservice
    this.ds.getTransaction(this.acno)

    .subscribe(
      (result:any)=>{
       this.transaction=result.transaction
      },
      result=>{
        alert(result.error.message)
      }
    )  
   
   
   
    


  }

  ngOnInit(): void {
  }

}
