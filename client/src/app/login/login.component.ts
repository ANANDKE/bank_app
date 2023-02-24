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

  //String interpolation - {{aim}} in html file
 aim = "Your perfect banking partner";

//property binding [placeholder] = "account"
 account = "Enter your account here";

 acno='';
 pswd='';

  //login model
  loginForm = this.fb.group({ //group
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  //(3rd execution) ----------------------------------------------------------------3rd
//class - collection of properties and methods
//properties/variables
//userdefined methods (4th execution) -------------------------------------------------------4th



  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { //(1st execution) ----------------------------------1st
    //It automatically invokes when object is created.
   }
       
  ngOnInit(): void { //(2nd execution) --------------------------------------2nd
    //FOr inital process of component
    //Lifecycle hook of Angular
  }

 
  acnoChange(event:any){
    console.log(event.target.value);
    
    this.acno=event.target.value;
    console.log(this.acno);
    

  }

  pswdChange(event:any){
    console.log(event.target.value);
    
    this.pswd=event.target.value;
    console.log(this.pswd);
    

  }
  // login(a:any,p:any){
  //  // alert('Login clicked');
  //  var acno = a.value;
  //  var pswd = p.value;
  //  var userDetails = this.userDetails;

  //  if(acno in userDetails){
  //   if(pswd==userDetails[acno]['password']){
  //     alert('Login successful');
  //   }
  //   else{
  //     alert("Invalid user details");
  //   }
  //  }



   
  // }
  login(){
    // alert('Login clicked');
   
   // var userDetails = this.ds.userDetails;
    if(this.loginForm.valid){
      var acno = this.loginForm.value.acno;
      var pswd = this.loginForm.value.pswd;
     this.ds.login(acno,pswd)
     .subscribe((result:any)=>{
      localStorage.setItem('currentUser',JSON.stringify(result.currentUser));
      localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno));
      localStorage.setItem('token',JSON.stringify(result.token));


      alert(result.message);
      this.router.navigateByUrl('dashboard');
     },
     result=>{
      alert(result.error.message)
     }
     )
  }
}
}
 
    
   



