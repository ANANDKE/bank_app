import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options ={
  headers:new HttpHeaders()
}

//globally http haeder object

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //current user

  currentUser="";

  //current acno
  currentAcno="";

  constructor(private http:HttpClient) { 
    //this.getDetails(); 
  }

  //saveDetails() - to store data into localStorage
  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('DataBase',JSON.stringify(this.userDetails))

    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))

    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))

    }
  }

  //getDetails() - To get data from the local storage
  // getDetails(){
  //   if(this.userDetails){
  //     this.userDetails=JSON.parse(localStorage.getItem('DataBase')|| '')
  //   }
  //   if(this.currentAcno){
  //     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')|| '')
  //   }
  //   if(this.currentUser){
  //     this.currentUser=JSON.parse(localStorage.getItem('currentUser')|| '')
  //   }
  // }

  //database...........
userDetails:any={
  1000:{acno:1000,username:'Richu',password:1000,balance:2000,transaction:[]},
  1001:{acno:1001,username:'Kichu',password:1001,balance:2000,transaction:[]},
  1002:{acno:1002,username:'Michu',password:1002,balance:2000,transaction:[]}
}
register(acno:any,username:any,password:any){
 
  const data={
    acno,
    username,
    password
  }

 return this.http.post('http://localhost:3000/register',data)  //this is an asynchronous call
 
  // let userDetails = this.userDetails
  // if(acno in userDetails){
  //   return false;
  // }
  // else{
  //   userDetails[acno]={
  //     acno:acno,
  //     username:username,
  //     password:password,
  //     balance:0,
  //     transaction:[],

  //   }
  //   console.log(userDetails);
  //   this.saveDetails();

  //   return true;
    
  // }

}

login(acno:any,password:any){

  const data={
    acno,
    password
  }

 return this.http.post('http://localhost:3000/login',data)  //this is an asynchronous call

  // let userDetails = this.userDetails
  // if(acno in userDetails){
  //   if(pswd == userDetails[acno]['password']){
  //     this.currentUser = userDetails[acno]['username'];
  //     this.currentAcno = acno;
  //     this.saveDetails();
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  // else{
  //   return false;
  // }

}

getToken(){
  //fetch token from localstorage
  const token = JSON.parse(localStorage.getItem('token')||'');

  //append token inside the header
  let headers = new HttpHeaders()

  if(token){
    options.headers=headers.append('x-access-token',token)
  }
  return options //to get token

} 

deposit(acno:any,password:any,amt:any){

  const data={
    acno,
    password,
    amount:amt
  }

 return this.http.post('http://localhost:3000/deposit',data,this.getToken()) 



  // let userDetails=this.userDetails;
  // var amount = parseInt(amt);
  // if(acno in userDetails){
  //   if(pswd==userDetails[acno]['password']){
  //     userDetails[acno]['balance'] +=amount;
  //     userDetails[acno]['transaction'].push({
  //       Type: "Credit",
  //       Amount: amount
  //     })
  //     console.log(userDetails);
  //     this.saveDetails();

      
  //     return userDetails[acno]['balance']
  //   }
  //   else{
  //     alert('password Incorrect');
  //     return false;
  //   }
  // }
  // else{
  //   alert("Invalid userDetails");
  //   return false;
  // }

}

withdraw(acno:any,password:any,amt:any){
  const data={
    acno,
    password,
    amount:amt
  }

 return this.http.post('http://localhost:3000/withdraw',data,this.getToken()) 


}

getTransaction(acno:any){
  const data={
    acno
  }

 return this.http.post('http://localhost:3000/transaction',data,this.getToken()) 
}

deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno) 

}
}
