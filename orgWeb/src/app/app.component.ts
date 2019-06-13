import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'org';
  constructor(private authservice : AuthServiceService){}
}
