
import { HotelCategory } from './../../shared/hotel-category';
/* import { mimeType } from './../../shared/mime-type.validator'; */
import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Api2Service } from './../../shared/api2.service';
import { Api3Service } from './../../shared/api3.service';
import { FormGroup, FormBuilder, Validators,FormArray } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'
import { PopdialogComponent } from 'src/app/features/popdialog/popdialog.component';

export interface Distance {
  beach: number;
  park: number;
  cityCenter: number;
  mainStreet: number;
}
// export interface PriceDeals {
//   _id?,
//   name?: string,
//   link?: string,
//   pricePerNight?: number
// }
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
  styleslist = ["Family-Friendly", "Romantic", "Business"]

  @ViewChild('chipList') chipList;
  @ViewChild('chipList2') chipList2;
  @ViewChild('resetHotelForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hotelForm: FormGroup;
/* images:string[]; */
deals:string[]=[];
popular:string[]=[];
amenities:string[]=[];
style:string[]=[];
map:Map={latitude: null,longitude: null};
rooms:number;
distance:Distance={beach:null,park:null,cityCenter:null,mainStreet:null};
Pricedeals:FormArray;
langaugeSpoken:string[]=[];
HotelCategoryData:any=[];
categories: HotelCategory ;
class:string;
/* imagePreview: string; */
// checkedStyles:any = [];
  constructor(public fb: FormBuilder,
    public router: Router,
    private ngZone: NgZone,
    public hotelApi: Api2Service,
    public hotelCategoryApi: Api3Service,
    private dialog:MatDialog) {


    this.hotelCategoryApi.GetHotelCategories().subscribe(data => {
      this.HotelCategoryData = data;
      console.log(this.HotelCategoryData)
    })


  }



  ngOnInit(): void {
    this.HotelFormData();

  }

  HotelFormData() {
    this.hotelForm = this.fb.group({
     /*  images: [[], {
        Validators: [Validators.required],
         asyncValidators: [mimeType]
      }], */
      deals: [this.deals],
      amenities: [this.amenities],
      style: [this.style],
      name: ['', [Validators.required]],
      map: [this.map],
      rooms: ['', [Validators.required]],
      likes: [''],
      distance: [this.distance,[Validators.required]],
      Pricedeals:this.fb.array([this.createPriceDeal()]),
      class: [this.class, [Validators.required]],
      popular: [this.popular],
      langaugeSpoken: [this.langaugeSpoken]
    })
  }



  createPriceDeal(): FormGroup{
    return this.fb.group({
      _id: '',
      name:'',
      link: '',
      pricePerNight:''
    });
  }
 //Add price deals
 addPriceDeals(): void {
  this.Pricedeals = this.hotelForm.get('Pricedeals') as FormArray;
  this.Pricedeals.push(this.createPriceDeal());
  console.log(this.Pricedeals)
}

  changeOutputStyle(event) {
    console.log(event);
    if (event.checked) {
      // this.checkedStyles.push(event.source.value);
      this.style.push(event.source.value)
      // console.log( this.checkedStyles);
      console.log(this.style);
    } else {
      // this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
      this.style = this.style.filter((p) => p !== event.source.value)
      // console.log(this.checkedStyles);
      console.log(this.style);
    }
  }

  changeOutputDeals(event) {
    console.log(event);
    if (event.checked) {
      this.deals.push(event.source.value)
      console.log(this.deals);
    } else {
      this.deals = this.deals.filter((p) => p !== event.source.value)
      console.log(this.deals);
    }
  }
  changeOutputAmenities(event) {
    console.log(event);
    if (event.checked) {
      this.amenities.push(event.source.value)
      console.log(this.amenities);
    } else {
      this.amenities = this.amenities.filter((p) => p !== event.source.value);
      console.log(this.amenities);
    }
  }
  changeOutputPopular(event) {
    console.log(event);
    if (event.checked) {
      this.popular.push(event.source.value)
      console.log(this.popular);
    } else {
      this.popular = this.popular.filter((p) => p !== event.source.value);
      console.log(this.popular);
    }
  }

  changeOutputlanguageSpoken(event) {
    console.log(event);
    if (event.checked) {
      this.langaugeSpoken.push(event.source.value)
      console.log(this.langaugeSpoken);
    } else {
      this.langaugeSpoken = this.langaugeSpoken.filter((p) => p !== event.source.value);
      console.log(this.langaugeSpoken);
    }
  }
  
  addMap(val,name:String){
    if(name=="latitude"){
      this.map['latitude']=parseFloat(val);
    }

    if (name == "longitude") {
      this.map['longitude'] = parseFloat(val);
    }
    console.log(val);

    console.log(this.map);

  }

  addDistance(val, name: String) {
    if (name == "beach") {
      this.distance['beach'] = parseInt(val);
    }

    if (name == "park") {
      this.distance['park'] = parseInt(val);
    }
    if (name == "cityCenter") {
      this.distance['cityCenter'] = parseInt(val);
    }
    if (name == "mainStreet") {
      this.distance['mainStreet'] = parseInt(val);
    }
    console.log(val);

    console.log(this.distance);

  }

 
 

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files;
  //   this.hotelForm.patchValue({ image_path: file });
  //   this.hotelForm.get('images').updateValueAndValidity();
  //   // console.log(file);
  //   // console.log(this.restaurantForm)
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

   

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.hotelForm.controls[controlName].hasError(errorName);
  }


  // Reset(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width="20%";
  //   dialogConfig.height="30%";
  //   dialogConfig.disableClose=true;
  //   const dialogRef=this.dialog.open(PopdialogComponent,dialogConfig)
  //      if (dialogRef.componentInstance.data==="T"){
  //       console.log("hii")
  //       this.hotelForm.reset();
  //     } 
  
  // }
  

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
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.width="20%";
    // dialogConfig.height="35%";
    
    console.log(this.distance);
    console.log(this.hotelForm.value.distance)
    // console.log(this.style)
    if (this.hotelForm) {
      // this.dialog.open(PopdialogComponent,dialogConfig)
      // if (this.hotelForm.valid && this.dialog.afterAllClosed){
      //   this.checkedStyles.forEach(item => {  
      //     this.style.push(item);  
      // });
      this.hotelApi.AddHotel(
        this.hotelForm.value.name, this.hotelForm.value.style,
        this.hotelForm.value.deals, this.hotelForm.value.amenities,
        this.hotelForm.value.rooms, this.hotelForm.value.map,
        this.hotelForm.value.class, this.hotelForm.value.Pricedeals,
        this.hotelForm.value.popular, this.hotelForm.value.distance,
        this.hotelForm.value.langaugeSpoken)
      console.log(this.hotelForm.value.style)
      console.log(this.hotelForm.value.deals)
      console.log(this.hotelForm.value.distance)
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
    // }
  }
    // else{
    //   alert("Please fill all data")
    // }

  }


}
