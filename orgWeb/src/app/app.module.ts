import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { TagInputModule } from 'ngx-chips';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {ActivatedRoute} from '@angular/router';
import { HttpClientModule ,HTTP_INTERCEPTORS}  from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesModule } from './employees/employees.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlertService } from 'ngx-sweetalert2';
import { NgxCurrencyModule } from "ngx-currency";
import {NgxMaskModule} from 'ngx-mask'

import { AvatarModule } from 'ngx-avatar';
import { QuickComponent } from './employees/quick/quick.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from '../app/auth/auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';

const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"];
 
@NgModule({
  declarations: [
    AppComponent,
    QuickComponent,

  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    EmployeesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TagInputModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
         timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    
    }),
    NgxCurrencyModule,
      NgxMaskModule.forRoot(),
      AvatarModule.forRoot({
        colors:avatarColors
      }),
     
  ],
  providers: [AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};
