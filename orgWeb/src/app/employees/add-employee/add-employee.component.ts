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
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [EmployeeServiceService]
})
export class AddEmployeeComponent implements OnInit {

  statedata;
  citydata;
  id;
  techSkills = [];
  maxDate: Date;
  details;
  h1;
  h2;
  h3;
  h4;
  h5;
  count;
  msgs1;
  public uploadfile;
  public formData = new FormData();
  constructor(private toastr: ToastrService, private employeeService: EmployeeServiceService, private stateservice: StateService, private route: ActivatedRoute, private router: Router) {
    this.details=[false, false,false, false,false];
  
    this.count = 0;
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


    this.statedata = this.stateservice.state_arr;

    this.RegistrationEmployee = new FormGroup({
      _id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)),
      mobile: new FormControl(null, Validators.pattern(/^[7-9]\d{9}$/)),
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

    // console.log(teSkill);
    this.techSkills.push(teSkill);
    console.log("---------------------------------", this.techSkills);
  }

  onRemoveing(event){

    console.log(event.value);
    console.log(this.techSkills);
    for(var i =0 ;i<this.techSkills.length ;i++){
      if(event.value==this.techSkills[i]){
        console.log(event.value);
        this.techSkills.splice(i,1);
      }
    }
    console.log(this.techSkills);
 
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
      'mobile': this.RegistrationEmployee.value.mobile,
      'dob': this.RegistrationEmployee.value.dob,
      'address': this.RegistrationEmployee.value.address,
      'city': this.RegistrationEmployee.value.city,
      'state': this.RegistrationEmployee.value.state,
      'zip': this.RegistrationEmployee.value.zip,
      'gender': this.RegistrationEmployee.value.gender,
      'techSkill': this.techSkills,
      'salary': this.RegistrationEmployee.value.salary,
      'hob': this.details
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
  onclick(event) {
    const val = event.target.value;
    this.citydata = this.stateservice.city[val];
  }



  hobbiesCheckArray = function (event, hobbies) {
    console.log(event.target.value);
  
    if(event.target.checked){
      this.details[event.target.value]=true;
      this.count += 1;
      
    }
    else{
     
      this.details[event.target.value]=false;
      this.count -= 1;
    }
   
    console.log(this.details,this.count);

  
  //   var mychecked=event.target.checked;
  //   console.log(mychecked);
  //   if(mychecked){
  //     for(var i=0; i< this.hobbies.length;i++){

  //       if(this.hobbies[i].name === hobbies){
  //         this.count +=1;
  //         this.details[i] = this.hobbies[i].name;
  //       }
  //     } 
  //   }else{
  //     for(var i=0; i< this.hobbies.length;i++){
  //       if(this.hobbies[i].name === hobbies){
  //         this.count -=1
  //         this.details[i] = null;
  //       }
  //     }}
  console.log(this.count);
      if(this.count != 1 )
    {       this.msgs1 = '';
    }
    else{
      this.msgs1 = 'Please choose atleast two hobbies option';
    }


} 

}
