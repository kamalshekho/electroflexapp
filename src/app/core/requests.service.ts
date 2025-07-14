import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private readonly baseUrl = 'http://localhost:8080/requests';

  constructor(private http: HttpClient) {}
}
