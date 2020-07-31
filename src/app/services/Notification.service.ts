import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarRef, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

private snackBarConfig: MatSnackBarConfig;
  private snackBarRef: MatSnackBarRef<any>;
    private snackBarAutoHide = "5000"; //milliseconds for notification , 5 secs
    actionButtonLabel: string = "Retry";
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 5000;
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  horizontalPosition: MatSnackBarHorizontalPosition = "center";

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.verticalPosition = this.verticalPosition;
    config.panelClass = 'center';
    this.snackBar.open(
      message,
      this.action ? this.actionButtonLabel : undefined,
      config
    );
  }
}