
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Api2Service } from './../../shared/api2.service';
import { Api3Service } from './../../shared/api3.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HotelCategory } from 'src/app/shared/hotel-category';

export interface Distance {
  mainStreet: number,
  beach: number,
  park: number,
  cityCenter : number
}
export interface PriceDeals {
  name: string,
    link: string,
    pricePerNight : number
}
export interface Map {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  styleslist=["a","b","c"]

  @ViewChild('chipListHotel') chipList;
  @ViewChild('resetHotelForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hotelForm: FormGroup;
images:string[];
deals:string[];
amenities:string[];
style:string[]=[];
map:Map;
rooms:number;
distance:Distance;
Pricedeals:PriceDeals[]=[];
langaugeSpoken:string[];
selected:string;
checkedStyles:any = [];
HotelCategoryData:any=[];
  constructor(public fb: FormBuilder,
    public router: Router,
    private ngZone: NgZone,
    public hotelApi: Api2Service,
    public hotelCategoryApi: Api3Service) { 

      this.hotelCategoryApi.GetHotelCategories().subscribe(data => {
        this.HotelCategoryData=data
        console.log(this.HotelCategoryData);
      })
    }

  ngOnInit(): void {
    this.HotelFormData();
  }

  HotelFormData() { 
    this.hotelForm = this.fb.group({
      deals: [this.deals],
      amenities: [this.amenities],
      style: [this.checkedStyles],
      name: ['', [Validators.required]],
      map: [this.map],
      rooms:[, [Validators.required]],
      distance:[this.distance],
      Pricedeals:[this.Pricedeals],
      langaugeSpoken:[this.langaugeSpoken]
    })
  }

    /* Add dynamic styles */
    // addStyle(event: MatChipInputEvent): void {
    //   const input = event.input;
    //   const value = event.value;
    //   // Add style
    //   if ((value || '').trim() && this.style.length < 5) {
    //     this.style.push(value.trim())
    //   }
    //   // Reset the input value
    //   if (input) {
    //     input.value = '';
    //   }
    // }

      /* Remove style */
  // removeStyle(index:number): void {
  //   const index = this.style.indexOf();
  //   if (index >= 0) {
  //     this.style.splice(index, 1);
  //   }
  // } 
  changeOutput(event){
    console.log(event); 
    if(event.checked){
      this.checkedStyles.push(event.source.value);
      this.style.push(event.source.value)
      console.log( this.checkedStyles);
      console.log(this.style);
    }else{
      this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
      this.style=this.style.filter((p)=>p!==event.source.value)
      console.log(this.checkedStyles);
      console.log(this.style);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.hotelForm.controls[controlName].hasError(errorName);
  }  

  /* Submit hotel */
  // submitHotelForm() { 
  //   this.hotelApi.AddHotel(
  //    this.hotelForm.value
  //   ).subscribe((event: HttpEvent<any>) => {
  //     switch (event.type) {
  //       case HttpEventType.Sent:
  //         console.log('Request has been made!');
  //         break;
  //       case HttpEventType.ResponseHeader:
  //         console.log('Response header has been received!');
  //         break;
        
  //       case HttpEventType.Response:
  //         console.log('User successfully created!', event.body);
          
  //         this.router.navigateByUrl('/hotel-list') 
  //     } 
  //   }) 
  // }      
  submitHotelForm() {
    
      // console.log(this.style)
    if (this.hotelForm) {/*  */
    //   this.checkedStyles.forEach(item => {  
    //     this.style.push(item);  
    // });
      this.hotelApi.AddHotel(this.hotelForm.value.name,this.hotelForm.value.style)
      console.log(this.hotelForm.value.style)
      // this.hotelApi.AddHotel(this.hotelForm.value).subscribe(res => {
      //   this.ngZone.run(() => this.router.navigateByUrl('/hotel-list'))
      // });
      /* this.hotelApi.AddHotel(
        this.hotelForm.value.name,
        this.hotelForm.value.style
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            
            this.router.navigateByUrl('/hotel-list') 
        } 
      })  */
    }
  
    }
  

}
