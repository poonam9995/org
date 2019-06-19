import { AbstractControl } from '@angular/forms';
import { containerRefreshEnd } from '@angular/core/src/render3';

export class commonValidation {


  static checkPassword(control: AbstractControl): { [key: string]: boolean } | null {
  console.log("****",control.get('password').value);  
  // if(control.value == null){}
  //   else{
  // console.log("********",control.root.get('password').value);
  //   }
    return null;
  }
}