import { Component } from '@angular/core';
import { Electrician } from '../../core/model/electricians.model';
import { ElectriciansService } from '../../core/services/electricians.service';
import { RequestsService } from '../../core/services/requests.service';
import { Request } from '../../core/model/request.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  electricians: Electrician[] = [];
  openRequests: Request[] = [];
  availableElectricians: Electrician[] = [];

  constructor(
    private requestsService: RequestsService,
    private electriciansService: ElectriciansService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.electriciansService.getAllElectricians().subscribe({
      next: (data) => {
        this.electricians = data;
        this.availableElectricians = data.filter((e) => e.isAvailable);
      },
    });

    this.requestsService.getAllRequests().subscribe({
      next: (data) => {
        this.openRequests = data.filter((r) => r.status === 'Open');
      },
    });
  }
}
