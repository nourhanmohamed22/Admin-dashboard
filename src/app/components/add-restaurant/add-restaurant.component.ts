import { Component, OnInit,ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
 
export interface Feature {
  name: string;
}
export interface Establishment {
  name: string;
}
export interface Meal{
  name: string;
}
export interface Cuisine{
  name: string;
}
export interface Dietary{
  name: string;
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
  @ViewChild('resetRestaurantForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  restaurantForm: FormGroup;
  featuresArray: Feature[] = [];
  establishmentArray:Establishment[]=[];
  cuisineArray:Cuisine[]=[];
  dietaryArray:Dietary[]=[];
  mealArray:Meal[]=[];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit(): void {
    this.submitBookForm();
  }
  constructor(    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private restaurantApi: ApiService) { }
    /* Reactive book form */
    submitBookForm() {
      this.restaurantForm = this.fb.group({
        name: ['', [Validators.required]],
        image_path: ['', [Validators.required]],
        restaurant_features:[this.featuresArray],
        establishment_type: [this.establishmentArray],
        meals:[this.mealArray],
        price_range:['', [Validators.required]],
        cuisine:[this.cuisineArray],
        dietary_restrictions:[this.dietaryArray],
        location:['', [Validators.required]],
        phone:['', [Validators.required]],
        
      })
    }
    /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add feature
    if ((value || '').trim() && this.featuresArray.length < 5) {
      this.featuresArray.push({ name: value.trim() })
    }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove dynamic languages */
  remove(feature: Feature): void {
    const index = this.featuresArray.indexOf(feature);
    if (index >= 0) {
      this.featuresArray.splice(index, 1);
    }
  }
    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
      return this.restaurantForm.controls[controlName].hasError(errorName);
    }  
      /* Submit book */
  submitRestaurantForm() {
    if (this.restaurantForm.valid) {
      this.restaurantApi.AddRestaurant(this.restaurantForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/restaurant-list'))
      });
    }
  }
}
