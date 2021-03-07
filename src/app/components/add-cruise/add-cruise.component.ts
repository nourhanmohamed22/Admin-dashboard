import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
import { Cruise } from './../../shared/cruise';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {ApiCruiseService} from './../../shared/api-cruise.service';
import { FormGroup, FormBuilder, Validators,FormArray } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'
import { PopdialogComponent } from 'src/app/features/popdialog/popdialog.component';

// export interface ShipInfo {
//   company_line ?: string;
//   criuse_ship ?: string;
//   launched ?: string;
// }

// export interface Travelers {
//   passengers ?: number;
//   crew ?: number;
// }

@Component({
  selector: 'app-add-cruise',
  templateUrl: './add-cruise.component.html',
  styleUrls: ['./add-cruise.component.css']
})
export class AddCruiseComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('chipList2') chipList2;
  @ViewChild('chipList3') chipList3;
  @ViewChild('chipList4') chipList4;
  @ViewChild('resetCruiseForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  cruiseForm: FormGroup;
  activities:string[]=[];
  entertainment:string[]=[];
  dining:string[]=[];
  travelers:FormArray;
  shipInfo:FormArray;
  images:string[] = [];
  constructor(public fb: FormBuilder,
    public router: Router,
    private ngZone: NgZone,
    public cruiseApi:ApiCruiseService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.cruiseFormData();
  }

  cruiseFormData(){
this.cruiseForm=this.fb.group({
  shipName: ['', [Validators.required]],
  price:[,[Validators.required]],
  discount:[,[Validators.required]],
  sailingDate:['',[Validators.required]],
  departureMonth:['',[Validators.required]],
  activities:[this.activities],
  entertainment:[this.entertainment],
  dining:[this.dining],
  days:[,[Validators.required]],
  whereTo:['',[Validators.required]],
  departsFrom:['',[Validators.required]],
  travelers:this.fb.array([this.createItem()]),
  shipInfo:this.fb.array([this.createInfo()]),
  images:[this.images]

})

  }

     /* Add img */
     addImg(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      // Add activity
      if ((value || '').trim() && this.images.length < 5) {
        this.images.push(value.trim())
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
         /* Remove img */
  removeImg(img: string): void {
    const index = this.images.indexOf(img); 
    if (index >= 0) {
      this.images.splice(index, 1);
    }
  } 
  createItem(): FormGroup {
    return this.fb.group({
      passengers: '',
      crew: ''
    });
  }
  createInfo(): FormGroup {
    return this.fb.group({
      company_line: '',
      criuse_ship: '',
      launched:''
    });
  }
  //Add traveler
  addItem(): void {
    this.travelers = this.cruiseForm.get('travelers') as FormArray;
    this.travelers.push(this.createItem());
    console.log(this.travelers)
  }
  //Add ship info
  addInfo(): void {
    this.shipInfo = this.cruiseForm.get('shipInfo') as FormArray;
    this.shipInfo.push(this.createInfo());
    console.log(this.shipInfo)
  }
   /* sailing date */
   formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.cruiseForm.get('sailingDate').setValue(convertDate, {
      onlyself: true
    })
  } 
  /* Add activities */
  addActivity(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add activity
    if ((value || '').trim() && this.activities.length < 5) {
      this.activities.push(value.trim())
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

   /* Add entertainments */
   addEntertainment(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add entertainment
    if ((value || '').trim() && this.entertainment.length < 5) {
      this.entertainment.push(value.trim())
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

   /* Add dining */
   addDining(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add dining
    if ((value || '').trim() && this.dining.length < 5) {
      this.dining.push(value.trim())
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove activities */
  removeActivity(activity: string): void {
    const index = this.activities.indexOf(activity); 
    if (index >= 0) {
      this.activities.splice(index, 1);
    }
  }  
   /* Remove entertainment */
   removeEntertainment(entertainment: string): void {
    const index = this.entertainment.indexOf(entertainment); 
    if (index >= 0) {
      this.entertainment.splice(index, 1);
    }
  }
   /* Remove dining */
   removeDining(dining: string): void {
    const index = this.dining.indexOf(dining); 
    if (index >= 0) {
      this.dining.splice(index, 1);
    }
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.cruiseForm.controls[controlName].hasError(errorName);
  }

  submitCruiseForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="20%";
    dialogConfig.height="35%";
  
    if (this.cruiseForm.valid) {
      this.cruiseApi.AddCruise(
        this.cruiseForm.value.shipName,
        this.cruiseForm.value.price,
        this.cruiseForm.value.discount,
        this.cruiseForm.value.sailingDate,
        this.cruiseForm.value.departureMonth,
        this.cruiseForm.value.days,
        this.cruiseForm.value.whereTo,
        this.cruiseForm.value.departsFrom,
        this.cruiseForm.value.activities,
        this.cruiseForm.value.entertainment,
        this.cruiseForm.value.dining,
        this.cruiseForm.value.travelers,
        this.cruiseForm.value.shipInfo,
        this.cruiseForm.value.images)

     }
  
    else{
      alert("Please fill all data")
    }

   }

}

