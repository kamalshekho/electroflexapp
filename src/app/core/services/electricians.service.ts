import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateElectrician, Electrician } from '../model/electricians.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectriciansService {
  private readonly baseUrl = 'http://localhost:8080/electrician';

  constructor(private http: HttpClient) {}

  addElectrician(electrician: CreateElectrician): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/addElectrician`,
      electrician,
    );
  }

  getAllElectricians(): Observable<Electrician[]> {
    return this.http.get<Electrician[]>(`${this.baseUrl}/getAllElectricians`);
  }

  toggleAvailability(electricianId: number): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/setAvailability/${electricianId}`,
      {},
    );
  }
}
