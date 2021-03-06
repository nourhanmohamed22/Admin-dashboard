import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCruiseService } from 'src/app/shared/api-cruise.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-update-cruise',
  templateUrl: './update-cruise.component.html',
  styleUrls: ['./update-cruise.component.css']
})
export class UpdateCruiseComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetcruiseForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  cruiseForm: FormGroup;
  activities:string[]=[];
  entertainment:string[]=[];
  dining:string[]=[];
  travelers:FormArray;
  shipInfo:FormArray;

  ngOnInit() {
    this.updatecruiseForm();
    
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private cruiseApi: ApiCruiseService,
 
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.cruiseApi.GetCruise(id).subscribe(data => {
      console.log(data)
      this.cruiseForm = this.fb.group({
        shipName: [data.shipName, [Validators.required]],
        price: [data.price, [Validators.required]],
        discount: [data.discount],
        sailingDate: [data.sailingDate, [Validators.required]],
        departureMonth: [data.departureMonth, [Validators.required]],
        days: [data.days, [Validators.required]],
        whereTo: [data.whereTo, [Validators.required]],
        departsFrom: [data.departsFrom, [Validators.required]],
        activities:[data.activities, [Validators.required]],
        entertainment:[data.entertainment, [Validators.required]],
        dining:[data.dining, [Validators.required]],
        travelers:this.fb.array(data.travelers, [Validators.required]),
        shipInfo:this.fb.array(data.shipInfo, [Validators.required])
     
      })      
  })

}

  /* Reactive cruise form */
  updatecruiseForm() {
    this.cruiseForm = this.fb.group({
      shipName: ['', [Validators.required]],
      price: [[Validators.required]],
      discount: [],
      sailingDate: [[Validators.required]],
      departureMonth: [[Validators.required]],
      days: [[Validators.required]],
      whereTo: ['', [Validators.required]],
      departsFrom:  ['',[Validators.required]],
      activities:['',[Validators.required]],
      entertainment:['',[Validators.required]],
      dining:['',[Validators.required]],
      travelers:this.fb.array([Validators.required]),
      passengers:['',[Validators.required]],
      crew:['',[Validators.required]],
      shipInfo:this.fb.array([Validators.required])

    })
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

  /* Update Cruise */
  updateCruiseForm() {
    console.log(this.cruiseForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.cruiseApi.UpdateCruise(id, this.cruiseForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/cruise-list'))
      });
    }
  }
  
}
