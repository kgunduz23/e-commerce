import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShippingInfo {
  carrier: string;
  address: {
    name: string;
    phone: string;
    address_line1: string;
    city_locality: string;
    state_province: string;
    postal_code: string;
    country_code: string;
  };
  cost: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = 'http://localhost:3000/shipping';

  constructor(private http: HttpClient) {}

  getShipping(weight: number): Observable<{ shipping: ShippingInfo }> {
    return this.http.get<{ shipping: ShippingInfo }>(`${this.apiUrl}?weight=${weight}`);
  }
}
