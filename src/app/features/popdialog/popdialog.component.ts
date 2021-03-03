import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';


@Component({
  selector: 'app-popdialog',
  templateUrl: './popdialog.component.html',
  styleUrls: ['./popdialog.component.css']
})
export class PopdialogComponent implements OnInit {
  data=false;
  constructor( public dialogRef: MatDialogRef<PopdialogComponent>,
   ) { }

  ngOnInit(): void {
  }
  onClick(){
    this.data=true
    this.dialogRef.close(this.data);
    return this.data;
  }
  onNoClick() {
    this.data=false
    this.dialogRef.close(this.data);
    return this.data;
  }

}
