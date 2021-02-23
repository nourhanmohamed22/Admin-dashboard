import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Admin} from '../../auth/_model/admin';
import { AdminService } from '../../auth/_services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opened = true;
  currentUser: Admin;
  loading = false;
    users: Admin[];
  constructor(private adminService: AdminService) { }

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    });


    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }
  @HostListener('window:resize', ['$event'])
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
  }

}
