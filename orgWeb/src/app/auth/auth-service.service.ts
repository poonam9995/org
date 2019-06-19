import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  readonly baseURL = "http://localhost:4000/auth";

  constructor(private http: HttpClient,private router :Router) { }

  postAuth(auth) {
    return this.http.post(this.baseURL, auth);
  }
  loginAuth(login){

    return this.http.post("http://localhost:4000/auth/login" , login);
  }


  forgetPassword(email){
  
   return this.http.post("http://localhost:4000/auth/forgetPass" , email);
  }
  resetPassword(password,id){
    return this.http.put("http://localhost:4000/auth/resetPassword"+`/${id}`,password );
  }

  loggedIn(){
  return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
