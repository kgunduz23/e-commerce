import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseApiUrl } from '../../env';

export interface OrderItem {
  id: number;
  item_name: string;
  quantity: number;
  weight: number;
  total_amount: number;
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

  getAllOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.apiUrl, {
      headers: { 'Cache-Control': 'no-cache' }
    });
  }


  addOrder(order: any): Observable<any> {
    return this.http.post(`${baseApiUrl}/orders`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
