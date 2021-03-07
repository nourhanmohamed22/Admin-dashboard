import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Api2Service } from './../../shared/api2.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HotelCategory } from 'src/app/shared/hotel-category';
import { Api3Service } from 'src/app/shared/api3.service';

export interface Map {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.css']
})
export class UpdateHotelComponent implements OnInit {
  styleslist = ["Family-Friendly", "Romantic", "Business"]

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resethotelForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hotelForm: FormGroup;
  map:Map={latitude: null,longitude: null};
  HotelCategoryData:any=[];
  categories: HotelCategory ;


  ngOnInit() {
    this.updatehotelForm();
    
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private hotelApi: Api2Service,
    public hotelCategoryApi: Api3Service
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.hotelApi.GetHotel(id).subscribe(data => {
      console.log(data)
      this.hotelForm = this.fb.group({
        name: [data.name, [Validators.required]],
        latitude: [data.map.latitude, [Validators.required]],
        longitude: [data.map.longitude, [Validators.required]],
        style: [data.style, [Validators.required]],
        Pricedeals: [data.Pricedeals],
        rooms: [data.rooms, [Validators.required]],
        images: [data.images],
        map:[data.map],
        class:[data.class],
        distance: [data.distance],
      })      
  })
    this.hotelCategoryApi.GetHotelCategories().subscribe(data => {
      this.HotelCategoryData = data;
    
   
  })

}


  /* Reactive hotel form */
  updatehotelForm() {
    this.hotelForm = this.fb.group({
      name: ['', [Validators.required]],
      booking: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      style: [],
      distance: [],
      Pricedeals: [''],
      rooms: ['', [Validators.required]],
      images: [''],
      map:[""],
      class:['']
    })
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


  createPriceDeal(): FormGroup{
    return this.fb.group({
      _id: null,
      name:'',
      link: '',
      pricePerNight:''
    });
  }
 //Add price deals
 addPriceDeals(): void {
  /* this.Pricedeals = this.hotelForm.get('Pricedeals') as FormArray;
  this.Pricedeals.push(this.createPriceDeal());
  console.log(this.Pricedeals) */
}


  changeOutputStyle(event) {
    console.log(event);
/*     if (event.checked) {
      // this.checkedStyles.push(event.source.value);
      this.style.push(event.source.value)
      // console.log( this.checkedStyles);
      console.log(this.style);
    } else {
      // this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
      this.style = this.style.filter((p) => p !== event.source.value)
      // console.log(this.checkedStyles);
      console.log(this.style);
    } */
  }
     /* Add img */
  addImg(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
 /*    // Add activity
    if ((value || '').trim() && this.images.length < 5) {
      this.images.push(value.trim())
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log(this.images) */
  }
     /* Remove img */
     removeImg(img: string): void {
     /*  const index = this.images.indexOf(img); 
      if (index >= 0) {
        this.images.splice(index, 1); 
      }*/
    } 
  changeOutputDeals(event) {
   
 /*    if (event.checked) {
      this.deals.push(event.source.value)
      console.log(this.deals);
    } else {
      this.deals = this.deals.filter((p) => p !== event.source.value)
      console.log(this.deals);
    } */
  }

  changeOutputAmenities(event) {
    console.log(event);
/*     if (event.checked) {
      this.amenities.push(event.source.value)
      console.log(this.amenities);
    } else {
      this.amenities = this.amenities.filter((p) => p !== event.source.value);
      console.log(this.amenities);
    } */
  }
  changeOutputPopular(event) {
    console.log(event);
  /*   if (event.checked) {
      this.popular.push(event.source.value)
      console.log(this.popular);
    } else {
      this.popular = this.popular.filter((p) => p !== event.source.value);
      console.log(this.popular);
    } */
  }

  changeOutputlanguageSpoken(event) {
  /*   console.log(event);
    if (event.checked) {
      this.langaugeSpoken.push(event.source.value)
      console.log(this.langaugeSpoken);
    } else {
      this.langaugeSpoken = this.langaugeSpoken.filter((p) => p !== event.source.value);
      console.log(this.langaugeSpoken);
    } */
  }
  


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.hotelForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateHotelForm() {
    console.log(this.hotelForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.hotelApi.UpdateHotel(id, this.hotelForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/hotel-list'))
      });
    }
  }
  
}
