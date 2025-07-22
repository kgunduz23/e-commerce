import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  weight: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) {}

  getOrder(): Observable<{ order: OrderItem[] }> {
    return this.http.get<{ order: OrderItem[] }>(this.apiUrl);
  }

  deleteOrder(id: number) {
    return this.http.delete(`http://localhost:3000/orders/${id}`);
  }


}
