import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {


  readonly baseURL = "http://localhost:4000/employees";

  constructor(private http: HttpClient) { }

  postEmployee(emp) {
    return this.http.post(this.baseURL, emp);
  }
  getEmployee() {
    return this.http.get(this.baseURL);
  }
  deleteEmployee(id) {
    console.log(id);
    return this.http.delete(this.baseURL + `/${id}`);
  }
  getEmpDetails(id) {
    console.log(id);
    return this.http.get(this.baseURL + `/${id}`);
  }
  updateEmpDetails(emp,id) {
    return this.http.put(this.baseURL + `/${id}`, emp);
  }
}
