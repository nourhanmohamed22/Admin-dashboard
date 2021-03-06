import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/_services/autentication.service';
import { Admin} from './auth/_model/admin';
import { SidenaveService } from './shared/sidenave.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='admin-dashboard';
  opened = true;
  currentUser?: Admin;
  loading = false;
    users: Admin[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private sideNavService: SidenaveService
) {
    this.authenticationService.currentUser?.subscribe(x => this.currentUser = x);
}
logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

clickMenu() { 
  this.sideNavService.toggle();
}
 
  ngOnInit() {
  }
}
