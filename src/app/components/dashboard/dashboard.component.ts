import { Component } from '@angular/core';
import { Electrician } from '../../core/model/electricians.model';
import { ElectriciansService } from '../../core/services/electricians.service';
import { RequestsService } from '../../core/services/requests.service';
import { Request } from '../../core/model/request.model';
import { AgCharts } from 'ag-charts-angular';

@Component({
  selector: 'app-dashboard',
  imports: [AgCharts],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  electricians: Electrician[] = [];
  openRequests: Request[] = [];
  availableElectricians: Electrician[] = [];

  pieChartOptions: any;
  barChartOptions: any;

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

        const unavailableCount =
          data.length - this.availableElectricians.length;

        this.pieChartOptions = {
          data: [
            { status: 'Available', count: this.availableElectricians.length },
            { status: 'Unavailable', count: unavailableCount },
          ],
          series: [
            {
              type: 'pie',
              angleKey: 'count',
              legendItemKey: 'status',
            },
          ],
        };
      },
    });

    this.requestsService.getAllRequests().subscribe({
      next: (data) => {
        this.openRequests = data.filter((r) => r.status === 'Open');

        const statusCounts: { [key: string]: number } = {};
        data.forEach((req) => {
          statusCounts[req.status] = (statusCounts[req.status] || 0) + 1;
        });

        const barChartData = Object.keys(statusCounts).map((status) => ({
          status,
          count: statusCounts[status],
        }));

        this.barChartOptions = {
          data: barChartData,
          series: [
            {
              type: 'bar',
              xKey: 'status',
              yKey: 'count',
              fill: '#4e73df',
            },
          ],
          axes: [
            { type: 'category', position: 'bottom' },
            { type: 'number', position: 'left' },
          ],
        };
      },
    });
  }
}
