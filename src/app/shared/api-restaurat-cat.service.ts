import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import{RestaurantCategory} from './restaurant-category'
@Injectable({
  providedIn: 'root'
})
export class ApiRestauratCatService {
  endpoint: string = 'https://tripadvisor-dashboard.herokuapp.com/api/restaurantCategory';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  GetRestaurantCategories() {  
    return this.http.get(`${this.endpoint}`);
  }
}
