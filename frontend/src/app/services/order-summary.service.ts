import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { OrderService, OrderItem } from './order.service';
import { ShippingService, ShippingInfo } from './shipping.service';
import { TaxService, TaxInfo } from './tax.service';

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
    private shippingService: ShippingService,
    private taxService: TaxService
  ) {}

  getOrderSummary(): Observable<OrderSummary> {
    return forkJoin({
      order: this.orderService.getOrder(),
      shipping: this.shippingService.getLatestShipping().pipe(map(res => res.shipping)),
      tax: this.taxService.getTax().pipe(map(res => res.tax))
    });
  }
}
