import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { commonValidation } from '../common/validation/common.validation';
import { ToastrService } from 'ngx-toastr';
declare var M: any;
@Component({
  selector: 'app-quick',
  templateUrl: './quick.component.html',
  styleUrls: ['./quick.component.scss'],
  providers: [EmployeeServiceService]
})
export class QuickComponent implements OnInit {
public uploadfile;
public formData = new FormData();
  constructor(private toastr: ToastrService, private employeeService: EmployeeServiceService, private stateservice: StateService, private route: ActivatedRoute, private router: Router) { }
  RegistrationEmployee:FormGroup;
  ngOnInit() {
  
    this.RegistrationEmployee = new FormGroup({
      _id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
      
      image: new FormControl(null)
    });
  }

  onFileChange(event) {
    this.uploadfile = event.target.files[0];
    //  console.log(this.uploadfile);  
  }

  onSubmit() {
    this.formData.append('image', this.uploadfile);

    //console.log(this.RegistrationEmployee.value.hob);

    const emp = {
      'firstName': this.RegistrationEmployee.value.firstName,
      'lastName': this.RegistrationEmployee.value.lastName,
      'email': this.RegistrationEmployee.value.email,
      }

    Object.entries(emp).forEach(
      ([key, value]: any[]) => {
        this.formData.append(key, value);
      });
    this.employeeService.postEmployee(this.formData).subscribe((res) => {
      if (res == null) {
        this.toastr.error('Error Occure', 'Register Unsuccesfully', {
          timeOut: 3000
        });
      }
      else {
        this.toastr.success('Employee Registration Successfully', 'Registered Succesfully.');
      }


    });

    // this.insert(this.RegistrationEmployee.value);
    this.router.navigate(['/employees']);
  }
}
