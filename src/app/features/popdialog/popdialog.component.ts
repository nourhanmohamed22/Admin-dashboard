import { Component, Inject, Injectable, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';


@Component({
  selector: 'app-popdialog',
  templateUrl: './popdialog.component.html',
  styleUrls: ['./popdialog.component.css']
})
export class PopdialogComponent implements OnInit {
 
  constructor( public dialogRef: MatDialogRef<PopdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : String) { }

  ngOnInit(): void {
  }
  onClick(){
    this.data="T"
    this.dialogRef.close(this.data);
    console.log(this.data)
    return this.data;
  }
  onNoClick() {
    this.data="N"
    this.dialogRef.close(this.data);
    return this.data;
  }

}
