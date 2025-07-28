import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { OrderService, OrderItem } from './order.service';
import { ShippingService, ShippingInfo } from './shipping.service';
import { TaxService, TaxInfo } from './tax.service';
import { HttpClient } from '@angular/common/http';
import { baseApiUrl } from '../../env';

export interface OrderSummary {
  order: OrderItem[];
  shipping: ShippingInfo;
  tax: TaxInfo;
}

@Injectable({
  providedIn: 'root',
})
export class OrderSummaryService {

  constructor(
    private orderService: OrderService,
    private http: HttpClient,
    private shippingService: ShippingService,
    private taxService: TaxService
  ) {}

  addOrder(order: any): Observable<any> {
    return this.http.post(`${baseApiUrl}/orders`, order);
  }




  getOrderSummary(shippingData: ShippingInfo): Observable<OrderSummary> {
  return this.orderService.getOrder().pipe(
    switchMap((orderResponse) => {
      const totalWeight = orderResponse.reduce((sum, item) => sum + item.weight * item.qty, 0);

      return forkJoin({
        shipping: this.shippingService.postShipping(shippingData).pipe(map(res => res.shipping)),
        tax: this.taxService.getTax().pipe(map(res => res.tax))
      }).pipe(
        map(({ shipping, tax }) => {
          return { order: orderResponse, shipping, tax };
        })
      );
    })
  );
}


}
