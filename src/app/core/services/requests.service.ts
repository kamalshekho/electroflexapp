import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRequest, Request } from '../model/request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private readonly baseUrl = 'http://localhost:8080/requests';

  constructor(private http: HttpClient) {}

  addRequest(request: CreateRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/addRequest`, request);
  }

  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/getAllRequests`);
  }

  getRequestById(id: number): Observable<CreateRequest[]> {
    return this.http.get<CreateRequest[]>(
      `${this.baseUrl}/getRequestById/${id}`,
    );
  }
}
