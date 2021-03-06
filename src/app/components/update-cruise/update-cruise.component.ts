import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCruiseService } from 'src/app/shared/api-cruise.service';

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
     
      })      
  })

}


  /* Reactive cruise form */
  updatecruiseForm() {
    this.cruiseForm = this.fb.group({
      shipName: ['', [Validators.required]],

    })
  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.cruiseForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
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
