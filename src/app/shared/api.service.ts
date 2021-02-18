import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { Hotel } from './hotel';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

   // Add restaurant
   AddRestaurant(data: Restaurant): Observable<any> {
    let API_URL = `${this.endpoint}/add-restaurant`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      ) 
  }
  // Get all restaurants
  GetRestaurants() {
    return this.http.get(`${this.endpoint}`);
  }
   // Get restaurant
   GetRestaurant(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-restaurant/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
    // Update restaurant
    UpdateRestaurant(id, data): Observable<any> {
      let API_URL = `${this.endpoint}/update-restaurant/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers })
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Delete restaurant
    DeleteRestaurant(id): Observable<any> {
      var API_URL = `${this.endpoint}/delete-restaurant/${id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }


  /* ******************** */
 // Add hotel
/*  AddHotel(data: Hotel): Observable<any> {
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
 // Get hotel
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
  } */
  /* **************** */

  
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
