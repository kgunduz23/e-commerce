import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseApiUrl } from '../../env';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  weight: number;
  shipping: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${baseApiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrder(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.apiUrl);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: { 'Cache-Control': 'no-cache' } 
    });
  }

  deleteOrder(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
}

}
