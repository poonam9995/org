import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js'

import { FormGroup, FormControl, FormArray, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { commonValidation } from '../common/validation/common.validation';
import 'sweetalert2/src/sweetalert2.scss'
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from '../employee-service.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private toastr: ToastrService, private employeService: EmployeeServiceService) { }

  ngOnInit() {
    this.refreshStudent();
    this.refreshStudent();
  }

  employees;
  public i = 0;


  refreshStudent() {
    this.employeService.getEmployee().subscribe((res: any) => {
      this.employees = res;
      console.log(res.firstName);
    });
  }

  onDelete(id) {
    console.log(id);


    Swal.fire({
      title: 'Are You Sure To Delete The Records ??',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.employeService.deleteEmployee(id).subscribe((res: any) => {

          if (res !== null) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
          else {
            this.toastr.error('Employee Records is Not Deleted Successfully', 'Deleted Unsuccessfully', {
              timeOut: 3000
            });
          }
          this.refreshStudent();
        });

      }
    })



    // if (confirm('Are You Sure To Delete the Records ?') == true) {
    //   this.employeService.deleteEmployee(id).subscribe((res: any) => {

    //     if(res !== null){
    //       this.toastr.success('Employee Records Deleted Successfully', 'Deleted Successfully');
    //     }
    //     else{
    //       this.toastr.error('Employee Records is Not Deleted Successfully', 'Deleted Unsuccessfully', {
    //         timeOut: 3000
    //       });
    //     }
    //     this.refreshStudent();
    //   });

    // }
    // else {

    // }
  }
}
