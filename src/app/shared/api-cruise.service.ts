import { Cruise } from './cruise';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class ApiCruiseService {
  private cruises: Cruise[] = [];
  private cruisesUpdated = new Subject<Cruise[]>();
  endpoint: string = 'https://tripadvisor-dashboard.herokuapp.com/api/cruise';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient,private router: Router) { }

   // Add cruise

   AddCruise(shipName:string,price:number,discount:number,sailingDate:Date,
    departureMonth:string,days:number,whereTo:string,departsFrom:string,
    activities:Array<string>,entertainment:Array<string>,dining:Array<string>,
    travelers:Array<object>,shipInfo:Array<object>,images:Array<string>) {
    const cruise: Cruise = {shipName:shipName,
    price:price,discount:discount,
  sailingDate:sailingDate,departureMonth:departureMonth,
days:days,whereTo:whereTo,
departsFrom:departsFrom,activities:activities,
entertainment:entertainment,dining:dining,
travelers:travelers,shipInfo:shipInfo,images:images};
    this.http
      .post<{ message: string; id: string }>(
        `${this.endpoint}/add-cruise`,
        cruise
      )
      .subscribe(responseData => {
        // const id = responseData.id;
        // hotel.id = id;
        this.cruises.push(cruise);
        this.cruisesUpdated.next([...this.cruises]);
        this.router.navigate(["/cruise-list"]);
      });
  }

   // Get all cruises
  
   GetCruises() {
    return this.http.get(`${this.endpoint}`);
  }

     // Get cruise
     GetCruise(id): Observable<any> {
      let API_URL = `${this.endpoint}/read-cruise/${id}`;
      return this.http.get(API_URL, { headers: this.headers })
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }

      // Update cruise
      UpdateCruise(id, data): Observable<any> {
        let API_URL = `${this.endpoint}/update-cruise/${id}`;
        return this.http.put(API_URL, data, { headers: this.headers })
          .pipe(
            catchError(this.errorMgmt)
          )
      }

       // Delete cruise
     DeleteCruise(id): Observable<any> {
      var API_URL = `${this.endpoint}/delete-cruise/${id}`;
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
