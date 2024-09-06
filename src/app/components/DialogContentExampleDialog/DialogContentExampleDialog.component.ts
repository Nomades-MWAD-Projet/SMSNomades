import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <div class="dialog-header">
      <button mat-icon-button (click)="onClose()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div class="dialog-content">
      <iframe width="100%" height="100%" src="https://zoom.us/rec/play/qrd5FVGJFiNXHdgt-YDpPBOuUgD70YGcJ_Xy5z6zBgC2zRCTmE1DdKiy9o9DeGVBe61mxUjKpAsyK6rJ.sYcEjhZd5vsNDWOV?canPlayFromShare=true&from=share_recording_detail&continueMode=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fzoom.us%2Frec%2Fshare%2FLx89RUEwZBcPblj2D8zvHQioj3KDKe1fpPMYtZZQdP28E2XnY37EcOTc9zFrwosL.Ow6CHspVz0x1n5Xd" title="description"></iframe>
    </div>
  `,
  styles: [`
    .dialog-header {
      display: flex;
      justify-content: flex-end;
    }
    .dialog-content {
      padding: 20px;
    }
  `],
  standalone: true,
  imports: [MatIconModule, MatButtonModule]
})
export class DialogContentExampleDialog {
  iframeUrl!: string;
  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}