import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dialog-bal',
  templateUrl: './dialog-bal.component.html',
  styleUrls: ['./dialog-bal.component.css']
})
export class DialogBalComponent {


 
  constructor(
  public dialogRef: MatDialogRef<DialogBalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
 
  onNoClick(): void {
  this.dialogRef.close();
  }
 }