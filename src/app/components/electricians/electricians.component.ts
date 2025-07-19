import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { ElectriciansService } from '../../core/services/electricians.service';
import { Electrician } from '../../core/model/electricians.model';
import { ElectricianFormComponent } from './electrician-form/electrician-form.component';
import { ColDef, NewValueParams } from 'ag-grid-community';
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
      field: 'firstName',
      headerName: 'First Name',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex: 1,
    },
    {
      field: 'isAvailable',
      headerName: 'Is Available',
      cellDataType: 'boolean',
      editable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      width: 130,
      onCellValueChanged: (params) => this.onAvailabilityChanged(params),
    },
    {
      field: 'email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex: 1,
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

  public onAvailabilityChanged(params: any): void {
    const electrician: Electrician = params.data;
    const newAvailability = params.newValue;

    this.electriciansService.toggleAvailability(electrician.id).subscribe({
      next: () => {
        console.log(`Availability toggled for ID ${electrician.id}`);

        this.loadElectricians();
      },
      error: (err) => {
        console.error('Error toggling availability', err);
        params.node.setDataValue('isAvailable', params.oldValue);
      },
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
