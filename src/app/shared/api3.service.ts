import { HotelCategory } from './hotel-category';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api3Service {
  endpoint: string = 'https://tripadvisor-dashboard.herokuapp.com/api/hotelCategory';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  GetHotelCategories() { 
    return this.http.get(`${this.endpoint}`);
  }

}
