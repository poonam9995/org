import { Component, OnInit} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormArray, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { commonValidation } from '../common/validation/common.validation';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
 import { AuthServiceService } from '../auth-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { ActivatedRoute, Router } from '@angular/router';

import 'sweetalert2/src/sweetalert2.scss'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  login: FormGroup;
  forgetPass: FormGroup;
  constructor(private modalService: BsModalService,private toastr: ToastrService, private authservice : AuthServiceService,private route: ActivatedRoute, private router: Router) { }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  ngOnInit() {
    this.login = new FormGroup({
      _id: new FormControl(null),     
    
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
     
      password: new FormControl(''),
     
    });
    this.forgetPass =new FormGroup({

      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
     
    });
  }
  onSubmit(){
    console.log(this.login.value);
    this.authservice.loginAuth(this.login.value).subscribe((res : any) => {
      console.log(res.message);
      if (res === null) {
        this.toastr.error('Loging Failed', 'Renter Email and  Passworsd..');
        this.router.navigate(['/']);
      }
      else {
        console.log(res.message);
        if(res.message === "Auth failed")
        {
          this.toastr.error('Password is worng', 'Renter Passworsd..');
          this.router.navigate(['/']);

        }
        else{
        localStorage.setItem('token',res.token);
        this.router.navigate(['/employees']);
        }
      }
    });     
   }
   onSubmitForget(){
    console.log( this.forgetPass.value);
    this.authservice.forgetPassword(this.forgetPass.value).subscribe((res : any) => {
      console.log(res);
     if (res === null) {
      this.toastr.error("Email is not valid",'Enter Valid Email');
      this.modalRef.hide();
      this.modalRef = null;
        this.router.navigate(['/']);
      }
      else {
        if(res.message == "email transfer Successful"){
        this.toastr.success('email transfer Successful');
        this.modalRef.hide(); 
        this.modalRef = null;
        this.router.navigate(['/']);
      }else{
        this.toastr.error('Email is not valid','Enter Valid Email');
        this.modalRef.hide();
        this.modalRef = null;
          this.router.navigate(['/']);
      }

      }
    });
  }
  
   close(): void {
     this.modalRef.hide();
    }

   }
  
