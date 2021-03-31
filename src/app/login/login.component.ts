import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitMessage: string;
  username = new FormControl();
  password = new FormControl();

  constructor(private authService : AuthenticationService, 
    private router : RouterService){
  
  }
  ngOnInit(): void {
  
  }
 
  loginForm =new FormGroup({
    username:this.username , 
    password: this.password
  });
  
      loginSubmit() {
  const val= this.authService.authenticateUser(this.loginForm.value);
  
  this.authService.authenticateUser(this.loginForm.value).subscribe(
    data=>{console.log(data),
    this.authService.setBearerToken(data['token']);
    this.router.routeToDashboard();
    },
    err=> {
      if(err.error){
        this.submitMessage=err.error.message;
      }
      else{
        this.submitMessage=err.message;
      }
    }
  )
      }}
