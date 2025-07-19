import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ElectriciansService } from '../../../core/services/electricians.service';

@Component({
  selector: 'app-electrician-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './electrician-form.component.html',
  styleUrls: ['./electrician-form.component.css'],
})
export class ElectricianFormComponent {
  electricianForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ElectricianFormComponent>,
    private elcectriciansService: ElectriciansService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.electricianForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  public onCancel(): void {
    this.dialogRef.close;
  }

  public onSubmit(): void {
    if (this.electricianForm.valid) {
      this.elcectriciansService
        .addElectrician(this.electricianForm.value)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }
}
