import { HotelCategory } from './hotel-category';
import { Injectable } from '@angular/core';
import { Hotel } from './hotel';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api2Service {

  endpoint: string = 'http://localhost:8008/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

   // Add hotel
   AddHotel(data: Hotel): Observable<any> {
    let API_URL = `${this.endpoint}/add-hotel`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      ) 
  }
   // Get all hotels
  GetHotels() {
    return this.http.get(`${this.endpoint}`);
  }
   // Get all hotel categories
   GetHotelCategories() { 
    return this.http.get(`${this.endpoint}`);
  }

   // Get restaurant
   GetHotel(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-hotel/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
    // Update hotel
    UpdateHotel(id, data): Observable<any> {
      let API_URL = `${this.endpoint}/update-hotel/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers })
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
     // Delete hotel
     DeleteHotel(id): Observable<any> {
      var API_URL = `${this.endpoint}/delete-hotel/${id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
     // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}



  