import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseApiUrl } from '../../env';


export interface ShippingInfo {
  carrier: string;
  name:string
  address: {
    phone: string;
    address_line1: string;
    city_locality: string;
    state_province: string;
    postal_code: string;
    country_code: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = `${baseApiUrl}/shipping`;

  constructor(private http: HttpClient) {}

  postShipping(shippingData: any): Observable<any> {
  return this.http.post(`${baseApiUrl}/shipping`, shippingData);
}


}
