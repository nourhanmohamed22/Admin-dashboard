import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  
  public sideNavToggle: BehaviorSubject<any> = new BehaviorSubject(null);
  sideNavToggleSubject: any;
  constructor() { }
  public toggle() {
    return this.sideNavToggle.next(null);
  } 
}
