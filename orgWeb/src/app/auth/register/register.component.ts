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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[AuthServiceService],
})
export class RegisterComponent implements OnInit {

  constructor(private toastr: ToastrService, private authservice : AuthServiceService,private route: ActivatedRoute, private router: Router) { }

  RegistrationEmployee: FormGroup;
  ngOnInit() {
    this.RegistrationEmployee = new FormGroup({
           
      Name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
      mobile: new FormControl(null, Validators.pattern(/^[7-9]\d{9}$/)),
      password: new FormControl('',Validators.required),
      cpassword: new FormControl('',[Validators.required,commonValidation.checkPassword]),
    });
  }

  onSubmit(){
      console.log(this.RegistrationEmployee.value);
      if(this.RegistrationEmployee.value.password === this.RegistrationEmployee.value.cpassword){
        console.log(this.RegistrationEmployee.value);
        this.authservice.postAuth(this.RegistrationEmployee.value).subscribe((res) => {
          if (res == null) {
            Swal.fire({
              title: 'Error!',
              text: 'User Registered Unsuccessfully',
              type: 'error',
              confirmButtonText: ''
            });
            this.router.navigate(['/register']);
          }
          else {
            Swal.fire({
    
              type: 'success',
              title: 'User Registered Successfully..',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/']);
          }
        });  
         
       }
      else{
        this.toastr.error('Password And Confirm Password Dose not Math', 'Renter Passworsd..', {
          timeOut: 3000
        });
        this.router.navigate(['/register']);
      }
    
  }
  checkPassword(){
    console.log(this.RegistrationEmployee.value);
  }
}
