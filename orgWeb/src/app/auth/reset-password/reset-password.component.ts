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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  id;
  constructor(private toastr: ToastrService, private authservice : AuthServiceService,private route: ActivatedRoute, private router: Router) { }

  resetPassword: FormGroup;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

   console.log(this.id);
    this.resetPassword = new FormGroup({
        
     password: new FormControl('',Validators.required),
      cpassword: new FormControl('',Validators.required),
    });
  }

  onSubmit(){
    console.log(this.resetPassword.value);
    if(this.resetPassword.value.password === this.resetPassword.value.cpassword){
      console.log(this.resetPassword.value);
      this.authservice.resetPassword(this.resetPassword.value,this.id).subscribe((res) => {
        if (res == null) {
          Swal.fire({
            title:'Error!',
            text: 'Unsuccessfully',
            type: 'error',
            confirmButtonText: ''
          });
          this.router.navigate(['/']);
        }
        else {
          Swal.fire({
  
            type: 'success',
            title: 'Successfully..',
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
      this.router.navigate(['/']);
    }
  
}

}
