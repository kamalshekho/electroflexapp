import { Component, Inject } from '@angular/core';
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
    public dialogRef: MatDialogRef<RequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.requestForm = this.fb.group({
      category: ['', Validators.required],
      serviceType: ['', Validators.required],
      description: [''],

      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      postalCode: [null, [Validators.required, Validators.min(10000)]],
      city: ['', Validators.required],

      desiredDate: [''],
      desiredTime: [''],

      customerFirstName: ['', Validators.required],
      customerLastName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],

      internalNote: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.dialogRef.close(this.requestForm.value);
    }
  }
}
