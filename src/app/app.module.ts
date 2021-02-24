import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

///Pages
import { HomeComponent } from './pages/home/home.component';


/// Components
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { HotelsListComponent } from './components/hotels-list/hotels-list.component';
import { UpdateHotelComponent } from './components/update-hotel/update-hotel.component';

//auth
import {LoginComponent} from './auth/login/login.component'
import {ErrorInterceptor } from './auth/_helpers/error.interceptor';
import { JwtInterceptor } from './auth/_helpers/jwt.interceptor';
import { fakeBackendProvider } from './auth/_helpers/fake-backend';
/// api services
import { ApiService } from './shared/api.service';
import { Api2Service } from './shared/api2.service';



@NgModule({
  declarations: [
    AppComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent,
    RestaurantsListComponent,
    AddHotelComponent,
    HotelsListComponent,
    UpdateHotelComponent,
    LoginComponent,
    HomeComponent
  
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  fakeBackendProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
