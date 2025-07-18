import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { ElectriciansService } from '../../core/services/electricians.service';
import { Electrician } from '../../core/model/electricians.model';
import { ElectricianFormComponent } from './electrician-form/electrician-form.component';
import { ColDef } from 'ag-grid-community';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-electricians',
  imports: [AgGridAngular, MatButtonModule],
  templateUrl: './electricians.component.html',
  styleUrl: './electricians.component.css',
})
export class ElectriciansComponent implements OnInit {
  rowData: Electrician[] = [];

  colDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      filter: 'agNumberColumnFilter',
      width: 70,
      cellStyle: {
        color: 'grey',
        fontSize: '12px',
      },
    },
    {
      field: 'electricianFirstName',
      headerName: 'First Name',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'electricianLastName',
      headerName: 'Last Name',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'isAvailable',
      headerName: 'Is Available',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
  ];

  constructor(
    private dialog: MatDialog,
    private electriciansService: ElectriciansService,
  ) {}

  public ngOnInit(): void {
    this.loadElectricians();
  }

  public openElectricianDialog(): void {
    const dialogRef = this.dialog.open(ElectricianFormComponent, {
      width: '1100px',
      maxHeight: '125vh',
      data: {},
    });
  }

  public loadElectricians() {
    this.electriciansService.getAllElectricians().subscribe({
      next: (electricians) => {
        this.rowData = electricians;
      },
      error: (err) => {
        console.log('Error!', err);
      },
    });
  }
}
