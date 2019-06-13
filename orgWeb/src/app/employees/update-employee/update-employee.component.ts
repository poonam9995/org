import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { commonValidation } from '../common/validation/common.validation';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
  providers: [EmployeeServiceService]
})
export class UpdateEmployeeComponent implements OnInit {
  statedata;
  citydata;
  newPref1;
  id;
  data;
  
  details = [false, false, false, false, false];
  techSkills = [];
  teckSkills2 = [];
  teckSkills1 = [];
  Dbdata : Date;
  maxDate: Date;
  public tS = [];
  public uploadfile;
  public count=0;
  public formData = new FormData();
  public newPref = [];
  constructor(private toastr: ToastrService, private employeeService: EmployeeServiceService, private stateservice: StateService, private route: ActivatedRoute, private router: Router) {

    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 0);
  }

  public hobbies = [
    { id: 0, name: "Swimming" },
    { id: 1, name: 'trekking' },
    { id: 2, name: 'Cycling' },
    { id: 3, name: 'Reading' },
    { id: 4, name: 'Writing' }
  ]
  RegistrationEmployee: FormGroup;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    if (this.id != null) {
      this.getEmp(this.id);
    }

    console.log(this.id);

    this.statedata = this.stateservice.state_arr;

    this.RegistrationEmployee = new FormGroup({
      _id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
      mobile: new FormControl(null, [Validators.maxLength(10), Validators.pattern(/^[7-9]\d{9}$/)]),
      dob: new FormControl(''),
      address: new FormControl(null),
      state: new FormControl(null),
      city: new FormControl(null),
      gender: new FormControl(null),
      hob: new FormControl(''),
      techSkill: new FormControl('', commonValidation.skillvali),
      salary: new FormControl(null),
      zip: new FormControl(null, Validators.pattern(/^[0-9]{6}$/)),
      image: new FormControl(null)
    });


  }

  onSkillAdd(event) {
    const teSkill = event.value;

    console.log(teSkill);
    this.techSkills.push(teSkill);
    console.log("---------------------------------", this.techSkills);
  }
  onSubmit() {

    if(this.RegistrationEmployee.value.dob == ""){
      this.Dbdata = this.RegistrationEmployee.value.dob;
    }
    else{
      this.Dbdata = this.maxDate;

    }

    // console.log(this.RegistrationEmployee.value);
    this.formData.append('image', this.uploadfile);
    console.log(this.RegistrationEmployee.value._id);
    const emp = {
      '_id': this.RegistrationEmployee.value._id,
      'firstName': this.RegistrationEmployee.value.firstName,
      'lastName': this.RegistrationEmployee.value.lastName,
      'email': this.RegistrationEmployee.value.email,
      'mobile': this.RegistrationEmployee.value.mobile,
      'dob': this.Dbdata,
      'address': this.RegistrationEmployee.value.address,
      'city': this.RegistrationEmployee.value.city,
      'state': this.RegistrationEmployee.value.state,
      'zip': this.RegistrationEmployee.value.zip,
      'gender': this.RegistrationEmployee.value.gender,
      'techSkill': this.techSkills,
      'salary': this.RegistrationEmployee.value.salary,
      'hob': this.details,

    }

    Object.entries(emp).forEach(
      ([key, value]: any[]) => {
        this.formData.append(key, value);
      });
    var id = this.RegistrationEmployee.value._id;
    console.log(id);

    this.employeeService.updateEmpDetails(this.formData, id).subscribe((res) => {
      if (res == null) {
        Swal.fire({
          title: 'Error!',
          text: 'Employee Details Updated Unsuccessfully',
          type: 'error',
          confirmButtonText: ''
        })
      }
      else {
        Swal.fire({

          type: 'success',
          title: 'Employee Details Updated Successfully..',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });

    this.router.navigate(['/employees']);
  }
  onFileChange(event) {
    this.uploadfile = event.target.files[0];
    }

  getEmp(id) {
    this.employeeService.getEmpDetails(id).subscribe((res: any) => {
      if (res == null) {
        console.log("null");
      } else {

        this.citydata = this.stateservice.city[res.state];
        console.log(res);
        this.data = res;
        this.citydata = this.stateservice.city[res.state];
       console.log(res.image);
       this.uploadfile = res.image;
        this.RegistrationEmployee.patchValue({
          '_id': res._id,
          'firstName': res.firstName,
          'lastName': res.lastName,
          'email': res.email,
          'mobile': res.mobile,
          'dob': res.dob,
          'address': res.address,
          'state': res.state,
          'city': res.city,
          'zip': res.zip,
          'gender': res.gender,
          'salary': res.salary,
          'image':res.image
        });

        this.setTechnicalSkills(res.techSkill);
        this.newPref1 = this.setHobbies(res.hob);
        console.log(this.newPref1);

        this.RegistrationEmployee.patchValue({
          'techSkill': this.tS,
        });
        this.RegistrationEmployee.patchValue({
          'hob':this.newPref1,
        });

      }
    });
  }

  onclick(event) {
    const val = event.target.value;
    this.citydata = this.stateservice.city[val];
  }


  setTechnicalSkills(skills) {
   
    if( skills == ''){
      this.techSkills ;
    }
    else{
    this.teckSkills2 = JSON.stringify(skills).split('\"');
    //console.log(this.teckSkills2);
    this.teckSkills1 = JSON.stringify(this.teckSkills2[1]).split(',');
    for (var i = 0; i < this.teckSkills1.length; i++) {
      this.tS[i] = this.teckSkills1[i].replace(/[^a-zA-Z ]/g, "")
    }
 
    this.techSkills = this.tS;
  }
    //  console.log(this.techSkills);
  }


  setHobbies(hob) {

    console.log(hob);
    var newString = JSON.stringify(hob[0]).split('\"');
    console.log(newString);
    var newStringOne = JSON.stringify(newString[1]).split(',');
    console.log(newStringOne);
    

    for (var i = 0; i < newStringOne.length; i++) {
      var myString = JSON.stringify(newStringOne[i]);
      myString = myString.replace(/[^a-zA-Z ]/g, "");
      this.newPref[i] = myString;

    }
    for(var i = 0; i<this.newPref.length;i++ ){
      if(this.newPref[i] == "true")
      {
        this.newPref[i]=true;
        this.count += 1;
      }
      else{
        this.newPref[i]=false;
        this.count -= 1;
      }
    }
    console.log(this.newPref);
    return this.newPref;
   
  }
  /**Swal.fire({
position: 'top-end',
type: 'success',
title: 'Your work has been saved',
showConfirmButton: false,
timer: 1500
}) */
  hobbiesCheckArray = function (event, hobbies) {
    // console.log(hobbies , event.target.checked);
        this.details=this.newPref;
    let data = this.hobbies.find(ob => ob['name'] === hobbies);
    console.log(this.newPref);
   
   var id =data.id
    if (event.target.checked) {
      this.details[id]=true;
      this.count += 1;
          }
      else{
        this.details[id]=false;
        this.count -= 1;
    }
   console.log(this.details, this.count);

    if (this.count != 1) {
    this.msgs1 = '';
    }
    else {
      this.msgs1 = 'Please choose atleast two hobbies option';
    }


  }

}
