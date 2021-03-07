import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiRestauratCatService } from 'src/app/shared/api-restaurat-cat.service';


@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resethotelForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  restaurantForm: FormGroup;
  RestaurantCategoryData: any = [];


  ngOnInit() {
    this.updaterestForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private restaurantApi: ApiService,
    public RestaurantCategoryApi:ApiRestauratCatService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.restaurantApi.GetRestaurant(id).subscribe(data => {
      console.log(data) 
      this.RestaurantCategoryApi.GetRestaurantCategories().subscribe(data => {
        this.RestaurantCategoryData = data; });
      this.restaurantForm = this.fb.group({
        name: [data.name, [Validators.required]],
        imageUrls: [data.imageUrls, [Validators.required]],
        contact: [data.contact, [Validators.required]],

      })      
    })    
  }

  

  
  updaterestForm() {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      imageUrls: ['', [Validators.required]],
      contact: ['', [Validators.required]],
   
    })
  }
 
 /*  addContact(val, name: String) {
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

  } */

  changeOutputDishes(event) {
   /*  console.log(event);
    if (event.checked) {
      this.dishes.push(event.source.value)
      console.log(this.dishes);
    } else {
      this.dishes = this.dishes.filter((p) => p !== event.source.value)
      console.log(this.dishes);
    } */
  }
  changeOutputDietary(event) {
  /*   console.log(event);
    if (event.checked) {
      this.DietaryRestrictions.push(event.source.value)
      console.log(this.DietaryRestrictions);
    } else {
      this.DietaryRestrictions = this.DietaryRestrictions.filter((p) => p !== event.source.value)
      console.log(this.DietaryRestrictions);
    } */
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.restaurantForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateRestaurantForm() {
    console.log(this.restaurantForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.restaurantApi.UpdateRestaurant(id, this.restaurantForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/restaurant-list'))
      });
    }
  }
  
}