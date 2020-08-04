import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-bal',
  templateUrl: './dialog-bal.component.html',
  styleUrls: ['./dialog-bal.component.css']
})
export class DialogBalComponent {
  loginForm: FormGroup;
  constructor(
  private fb: FormBuilder,
  public dialogRef: MatDialogRef<DialogBalComponent>,
  @Inject(MAT_DIALOG_DATA) data) { }
 
  onNoClick(): void {
  this.dialogRef.close();
  }

  get amount(){
    return this.loginForm.get('amount');
  }

  get pin(){
    return this.loginForm.get('pin');
  }

  onLogin() {
    this.dialogRef.close(this.loginForm.value);
}

 

ngOnInit() {
  this.loginForm = this.fb.group({
    amount: ['',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(4),
    ]],
    pin: ['',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(4),
    ]],
  });
}
 }