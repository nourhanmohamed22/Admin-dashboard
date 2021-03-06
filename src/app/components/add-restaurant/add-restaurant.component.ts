import { mimeType } from './../../shared/mime-type.validator';
import { Component, OnInit, ViewChild, NgZone,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {HttpEventType, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ApiRestauratCatService } from 'src/app/shared/api-restaurat-cat.service';
import{UploadImgService} from './../../shared/upload-img.service';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators'; 

export interface Address {
  streetname: String,
  zipcode: Number,
  location: {
    latitude: Number,
    longitude: Number
  }
}
export interface Contact {
  telephone: Number,
  Email: String,
  website: String,
  openhours: String,
}
export interface resDescription {
  text: string;
  lang?: string[];
}


@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList') chipList;
  @ViewChild('chipList2') chipList2;
  @ViewChild('chipList3') chipList3;
  @ViewChild('chipList4') chipList4;
  @ViewChild('chipList5') chipList5;
  @ViewChild('resetRestaurantForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  restaurantForm: FormGroup;
  imagePreview: string;
  imageUrls: string[] = [];
  address: Address = { streetname: null, zipcode: null, location: { latitude: null, longitude: null } };
  contact: Contact = { telephone: null, Email: null, website: null, openhours: null };
  descripation: resDescription = { text: null, lang: [''] };
  Establishment: string[] = [];
  features: string[] = [];
  meals: string[] = [];
  Pricerange: string;
  cuisine: string[] = [];
  dishes: string[] = [];
  DietaryRestrictions: string[] = [];
  goodFor: string[] = [];
  RestaurantCategoryData: any = [];
file;

  ngOnInit(): void {
    this.submitBookForm();
  }
  constructor(public fb: FormBuilder,
    public router: Router,
    private ngZone: NgZone,
    public restaurantApi: ApiService,
    public RestaurantCategoryApi:ApiRestauratCatService,
    private https: HttpClient) {
      this.RestaurantCategoryApi.GetRestaurantCategories().subscribe(data => {
        this.RestaurantCategoryData = data;
        console.log(this.RestaurantCategoryData)
      })
  }
  /* Reactive book form */
  submitBookForm() {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      imageUrls: [null, {
        Validators: [Validators.required],
        asyncValidators: [mimeType]
      }],
      address: [this.address,[Validators.required]],
      contact: [this.contact,[Validators.required]],
      descripation: [this.descripation,[Validators.required]],
      Establishment: [this.Establishment, [Validators.required]],
      features: [this.features, [Validators.required]],
      meals: [this.meals, [Validators.required]],
      Pricerange: [this.Pricerange, [Validators.required]],
      cuisine: [this.cuisine, [Validators.required]],
      dishes: [this.dishes, [Validators.required]],
      DietaryRestrictions: [this.DietaryRestrictions, [Validators.required]],
      goodFor: [this.goodFor, [Validators.required]],
      
    })
  }

  addAddress(val, name: String) {
    if (name == "streetname") {
      this.address['streetname'] = val;
    }

    if (name == "zipcode") {
      this.address['zipcode'] = parseFloat(val);
    }
    if (name == "location.latitude") {
      this.address.location['latitude'] = parseFloat(val);
    }
    if (name == "location.longitude") {
      this.address.location['longitude'] = parseFloat(val);
    }
    console.log(val);

    console.log(this.address);

  }
  addContact(val, name: String) {
    if (name == "telephone") {
      this.contact['telephone'] = parseInt(val);
    }
        
    if (name == "Email") {  
      this.contact['Email'] = val; 
    }
    if (name == "website") {
      this.contact['website'] = val;
    }
    if (name == "openhours") {
      this.contact['openhours'] = val;
    }
    console.log(val);

    console.log(this.contact);

  }
  addDescription(val, name: String) {
    if (name == "text") {
      this.descripation['text'] = val;
    }

    console.log(val);

    console.log(this.descripation);

  }
  changeOutputEstablishment(event) {
    console.log(event);
    if (event.checked) {
      this.Establishment.push(event.source.value)
      console.log(this.Establishment);
    } else {
      this.Establishment = this.Establishment.filter((p) => p !== event.source.value)
      console.log(this.Establishment);
    }
  }
  changeOutputFeatures(event) {
    console.log(event);
    if (event.checked) {
      this.features.push(event.source.value)
      console.log(this.features);
    } else {
      this.features = this.features.filter((p) => p !== event.source.value)
      console.log(this.features);
    }
  }
  changeOutputMeals(event) {
    console.log(event);
    if (event.checked) {
      this.meals.push(event.source.value)
      console.log(this.meals);
    } else {
      this.meals = this.meals.filter((p) => p !== event.source.value)
      console.log(this.meals);
    }
  }
  changeOutputCuisine(event) {
    console.log(event);
    if (event.checked) {
      this.cuisine.push(event.source.value)
      console.log(this.cuisine);
    } else {
      this.cuisine = this.cuisine.filter((p) => p !== event.source.value)
      console.log(this.cuisine);
    }
  }
  changeOutputDishes(event) {
    console.log(event);
    if (event.checked) {
      this.dishes.push(event.source.value)
      console.log(this.dishes);
    } else {
      this.dishes = this.dishes.filter((p) => p !== event.source.value)
      console.log(this.dishes);
    }
  }
  changeOutputDietary(event) {
    console.log(event);
    if (event.checked) {
      this.DietaryRestrictions.push(event.source.value)
      console.log(this.DietaryRestrictions);
    } else {
      this.DietaryRestrictions = this.DietaryRestrictions.filter((p) => p !== event.source.value)
      console.log(this.DietaryRestrictions);
    }
  }
  changeOutputGoodFor(event) {
    console.log(event);
    if (event.checked) {
      this.goodFor.push(event.source.value)
      console.log(this.goodFor);
    } else {
      this.goodFor = this.goodFor.filter((p) => p !== event.source.value)
      console.log(this.goodFor);
    }
  }
  // onImagePicked(event: Event) {
  //   this.file = (event.target as HTMLInputElement).files[0];
  //   this.restaurantForm.patchValue({ imageUrls: this.file });
  //   this.restaurantForm.get('imageUrls').updateValueAndValidity();
  //   // console.log(file);
  //   // console.log(this.restaurantForm)
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(this.file);
  // }
 

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.restaurantForm.controls[controlName].hasError(errorName);
  }
  /* Submit book */
  //  submitRestaurantForm() {
  //    // if (this.restaurantForm.invalid) {
  //    //   return;
  //   //  } 
  //   console.log("pressed1"); 
  //   // shetl valid ===> this.restaurantForm.valid
  //   if (this.restaurantForm) {
  //     console.log("pressed");
  //     this.restaurantApi.AddRestaurant(this.restaurantForm.value).subscribe(res => {
  //       this.ngZone.run(() => this.router.navigateByUrl('/restaurant-list'))
  //     }, (error) => {
  //       console.log(error);
  //     }); 
  //   }
  // }
  submitRestaurantForm() {
    if (this.restaurantForm.invalid) {
      return;
    }
  //   let formData = new FormData()

  //   formData.append('imageUrls',this.file)


  // this.https.post('http://localhost:8000/api/restaurant/add-restaurant', formData).subscribe((res) => {
  //   console.log('done', res)
  // })
    if (this.restaurantForm) {
      this.restaurantApi.AddRestaurant(
        this.restaurantForm.value.name,
        this.restaurantForm.value.address,
        this.restaurantForm.value.contact,
        this.restaurantForm.value.descripation,
        this.restaurantForm.value.features,
        this.restaurantForm.value.Establishment,
        this.restaurantForm.value.meals,
        this.restaurantForm.value.Pricerange,
        this.restaurantForm.value.cuisine,
        this.restaurantForm.value.dishes,
        this.restaurantForm.value.DietaryRestrictions,
        this.restaurantForm.value.goodFor

      )

    }
  }
}
