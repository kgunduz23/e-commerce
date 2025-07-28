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

  deleteOrder(id: number) {
    return this.http.delete(`${baseApiUrl}/orders/${id}`);
  }
}
