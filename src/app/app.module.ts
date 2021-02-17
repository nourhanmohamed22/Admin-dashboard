import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './components/update-restaurant/update-restaurant.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { HotelsListComponent } from './components/hotels-list/hotels-list.component';
import { UpdateHotelComponent } from './components/update-hotel/update-hotel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';

@NgModule({
  declarations: [
    AppComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent,
    RestaurantsListComponent,
    AddHotelComponent,
    HotelsListComponent,
    UpdateHotelComponent,
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
