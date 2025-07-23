import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaxInfo {
  amount: number; // Örn: 0.18 (yani %18)
}

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private apiUrl = 'http://localhost:3000/tax';

  constructor(private http: HttpClient) {}

  // Veritabanından sabit vergi oranı alır
  getTax(): Observable<{ tax: TaxInfo }> {
    return this.http.get<{ tax: TaxInfo }>(this.apiUrl);
  }
}
