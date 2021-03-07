import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { Subject } from "rxjs";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private restaurants: Restaurant[] = [];
  private restaurantsUpdated = new Subject<Restaurant[]>();
  endpoint: string = 'https://tripadvisor-dashboard.herokuapp.com/api/restaurant';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient,private router: Router) { }

   // Add restaurant
   AddRestaurant(name:string,address:Object,
    contact:Object,description:Object,
    features:Array<string>,Establishment:Array<string>,
    meals:Array<string>,Pricerange:string,
    cuisine:Array<string>,dishes:Array<string>,
    DietaryRestrictions:Array<string>,
    goodFor:Array<string> ,imageUrls:Array<string>) {
    const restaurant: Restaurant = { name:name,address:address,
    contact:contact,descripation:description,
    features:features,Establishment:Establishment,meals:meals,
    Pricerange:Pricerange,cuisine:cuisine,
    dishes:dishes,DietaryRestrictions:DietaryRestrictions,
    goodFor:goodFor,imageUrls:imageUrls};
    this.http
      .post<{ message: string; id: string }>(
        `${this.endpoint}/add-restaurant`,
        restaurant
      )
      .subscribe(responseData => {
        this.restaurants.push(restaurant);
        this.restaurantsUpdated.next([...this.restaurants]);
        this.router.navigate(["/restaurant-list"]);
      });
  }
  
  //Get all restaurants
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
