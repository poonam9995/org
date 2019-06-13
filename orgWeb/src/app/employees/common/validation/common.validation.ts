import { AbstractControl } from '@angular/forms';

export class commonValidation {

  static skillvali(control: AbstractControl): { [key: string]: boolean } | null {
    const data: number = control.value.length;
    if (data == 1) {
      return { skillvali: true };
    }
    return null;

  }

  static checkTrue(control: AbstractControl): { [key: string]: boolean } | null {
    const data1: any = [];

    var data = 0;
    data1.push(control.get('Travaling').value);
    data1.push(control.get('Swimming').value);
    data1.push(control.get('cycling').value);
    data1.push(control.get('tracking').value);
    data1.push(control.get('Others').value);
    for (var i = 0; i < data1.length; i++) {
      if (data1[i] == true) {
        data++;
      }
    }
    if (data == 1) {
      return { checkError: true };
    }
    return null;

  }
}