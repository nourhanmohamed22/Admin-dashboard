import { Cruise } from './../../shared/cruise';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator'
import {MatTableDataSource } from '@angular/material/table'
import {DatePipe} from '@angular/common';
import { MatSort } from '@angular/material/sort';
import {ApiCruiseService} from './../../shared/api-cruise.service';

@Component({
  selector: 'app-cruise-list',
  templateUrl: './cruise-list.component.html',
  styleUrls: ['./cruise-list.component.css']
})
export class CruiseListComponent implements OnInit {
  CruiseData: any = [];
    dataSource: MatTableDataSource<Cruise>;
    @ViewChild(MatSort,{ static: false }) sort: MatSort;
    @ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
    displayedColumns: string[] = ['shipName','price','discount','sailingDate','departureMonth','days',
   'whereTo' ,'departsFrom','action'];
  constructor(private cruiseApi:ApiCruiseService,
    public datepipe:DatePipe) {
    this.cruiseApi.GetCruises().subscribe(data => {
      this.CruiseData = data;
      this.dataSource = new MatTableDataSource<Cruise>(this.CruiseData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 0);
    })
   }

  ngOnInit(): void {
  }

  DeleteCruise(index: number, e){
      
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.cruiseApi.DeleteCruise(e._id).subscribe()
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();

}
}