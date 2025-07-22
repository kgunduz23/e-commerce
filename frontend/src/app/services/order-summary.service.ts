import { Injectable } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
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

  getOrderSummary() {
    return this.orderService.getOrder().pipe(
      switchMap((orderResponse) => {
        const order = orderResponse.order;
        const totalWeight = order.reduce((sum, item) => sum + item.weight * item.qty, 0);

        return forkJoin({
          shipping: this.shippingService.getShipping(totalWeight).pipe(map(res => res.shipping)),
          tax: this.taxService.getTax().pipe(map(res => res.tax)),
        }).pipe(
          map(({ shipping, tax }) => ({
            order,
            shipping,
            tax,
          }))
        );
      })
    );
  }
}
