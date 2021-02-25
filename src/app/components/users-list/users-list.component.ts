import { Component, ViewChild, OnInit } from '@angular/core';
import { User } from './../../shared/user';
import { ApiUserService } from './../../shared/api-user.service';
import { MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['FirstName', 'LastName', 'Username','Joining_date','Phone_Number', 'Home_Airport','Email', 'action'];

  constructor(private userApi: ApiUserService,
    public datepipe:DatePipe,) {
    this.userApi.GetUsers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }

  DeleteUser(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.userApi.DeleteUser(e._id).subscribe()
    }
  }

}
