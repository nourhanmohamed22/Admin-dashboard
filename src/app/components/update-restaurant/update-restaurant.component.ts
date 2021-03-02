import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


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


  ngOnInit() {
    this.updaterestForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private restaurantApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.restaurantApi.GetRestaurant(id).subscribe(data => {
      console.log(data)
      this.restaurantForm = this.fb.group({
        name: [data.name, [Validators.required]],

      })      
    })    
  }

  
  updaterestForm() {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
   
    })
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
  
    /* if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    } */
  }

  /* Remove dynamic languages */
  remove(): void {
    /* const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    } */
  }

  /* Date */
  /* formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.restaurantForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  } */

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