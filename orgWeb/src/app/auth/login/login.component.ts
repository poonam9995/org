import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormArray, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { commonValidation } from '../common/validation/common.validation';

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

  login: FormGroup;
  constructor(private toastr: ToastrService, private authservice : AuthServiceService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.login = new FormGroup({
      _id: new FormControl(null),     
    
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
     
      password: new FormControl(''),
     
    });
  }
  onSubmit(){
    console.log(this.login.value);
    this.authservice.loginAuth(this.login.value).subscribe((res : any) => {
      console.log(res.error);
      if (res === null) {
        Swal.fire({
          title: 'Error!',
          text: 'Login Not Possible',
          type: 'error',
          confirmButtonText: ''
        })
      }
      else {
        console.log(res.token);
        localStorage.setItem('token',res.token);
        this.router.navigate(['/employees']);
        Swal.fire({
          type: 'success',
          title: 'Login Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });     
   }


}
