import { Component } from '@angular/core';
import { Electrician } from '../../core/model/electricians.model';
import { ElectriciansService } from '../../core/services/electricians.service';
import { RequestsService } from '../../core/services/requests.service';
import { Request } from '../../core/model/request.model';
import { AgCharts } from 'ag-charts-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [AgCharts, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  electricians: Electrician[] = [];
  openRequests: Request[] = [];
  totalRequests: Request[] = [];
  availableElectricians: Electrician[] = [];

  pieChartOptions: any;
  barChartOptions: any;
  areaChartOptions: any;

  constructor(
    private requestsService: RequestsService,
    private electriciansService: ElectriciansService,
  ) {}

  ngOnInit() {
    this.loadData();
    this.setupMockAreaChart();
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
        this.totalRequests = data;
        this.openRequests = data.filter((r) => r.status === 'Open');

        const closedRequests = data.filter((r) => r.status === 'Closed').length;

        this.barChartOptions = {
          data: [
            { status: 'Open', count: this.openRequests.length },
            { status: 'Closed', count: closedRequests },
          ],
          series: [
            {
              type: 'bar',
              xKey: 'status',
              yKey: 'count',
            },
          ],
        };
      },
    });
  }

  setupMockAreaChart() {
    this.areaChartOptions = {
      data: [
        { month: 'Jan', requests: 12 },
        { month: 'Feb', requests: 18 },
        { month: 'Mar', requests: 14 },
        { month: 'Apr', requests: 20 },
        { month: 'May', requests: 25 },
        { month: 'Jun', requests: 22 },
        { month: 'Jul', requests: 30 },
        { month: 'Aug', requests: 28 },
        { month: 'Sep', requests: 24 },
        { month: 'Oct', requests: 26 },
        { month: 'Nov', requests: 19 },
        { month: 'Dec', requests: 23 },
      ],
      series: [
        {
          type: 'area',
          xKey: 'month',
          yKey: 'requests',
          fillOpacity: 0.7,
        },
      ],
    };
  }
}
