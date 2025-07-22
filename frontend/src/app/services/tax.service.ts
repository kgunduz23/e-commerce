import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaxInfo {
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private apiUrl = 'http://localhost:3000/tax';

  constructor(private http: HttpClient) {}

  getTax(): Observable<{ tax: TaxInfo }> {
    return this.http.get<{ tax: TaxInfo }>(this.apiUrl);
  }
}
