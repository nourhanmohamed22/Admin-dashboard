import { Component, ViewChild, HostListener, OnInit, QueryList, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/_services/autentication.service';
import { AdminService } from './auth/_services/admin.service';
import { Admin} from './auth/_model/admin';



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

    @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private adminService: AdminService
) {
    this.authenticationService.currentUser?.subscribe(x => this.currentUser = x);
}
logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}
 
  ngOnInit() {
 /*    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
    this.loading = true;
    this.adminService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    }); */
    
  }

 /*  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  } */

 
}
