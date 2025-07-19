import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RequestsService } from '../../../core/services/requests.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css',
})
export class RequestFormComponent {
  requestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<RequestFormComponent>,
    private requestsService: RequestsService,
    private authService: AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.requestForm = this.fb.group({
      serviceType: ['', Validators.required],
      description: [''],
      version: [1],

      desiredDate: [''],
      desiredTime: [''],

      customerId: [authService.getCurrentUser()?.customerId],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.requestsService.addRequest(this.requestForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
