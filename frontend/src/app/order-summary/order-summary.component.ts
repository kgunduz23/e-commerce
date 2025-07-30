import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { OrderSummaryService, OrderSummary } from '../services/order-summary.service';
import { OrderService } from '../services/order.service';
import { OrderDetailsComponent } from './child-components/order-details.component';
import { ShippingInfoComponent } from './child-components/shipping-info.component';
import { TaxInfoComponent } from './child-components/tax-info.component';
import { WeightPipe } from '../pipes/weight.pipe';
import { TitleUppercasePipe } from '../pipes/title-uppercase.pipe';
import { ShippingService } from '../services/shipping.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ShippingInfoComponent,
    TaxInfoComponent,
    //OrderDetailsComponent,
    WeightPipe,
    TitleUppercasePipe
  ],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css'
})
export class OrderSummaryComponent implements OnInit {
  orderSummary$: Observable<OrderSummary>;
  //orders: any[] = [];
  orders$ = new BehaviorSubject<any[]>([]);
  
  orderInfo = {
    item_name: '',
    quantity: 1,
    weight: 1,
    price: 0
  };

  shippingInfo = {
    carrier: '',
    name: '',
    base_shipping: 20,
    address: {
      phone: '',
      address_line1: '',
      city_locality: '',
      state_province: '',
      postal_code: '',
      country_code: ''
    }
  };

  constructor(
    private summaryService: OrderSummaryService,
    private orderService: OrderService,
    private shippingService: ShippingService
  ) {
    this.orderSummary$ = this.summaryService.getOrderSummary();
  }

  ngOnInit(): void {
    this.loadOrders();
    this.resetForm();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().pipe(take(1)).subscribe({
      next: (data) => this.orders$.next(data),
      error: (err) => console.error('Fetching error:', err)
    });
  }

  getShippingMultiplier(): number {
    const w = this.orderInfo.weight;
    if (w >= 5 && w < 10) return 2;
    if (w >= 10 && w < 15) return 3;
    if (w >= 15 && w < 20) return 4;
    if (w >= 20) return 5;
    return 1;
  }

  getTotalShippingCost(): number {
    const multiplier = this.getShippingMultiplier();
    return this.shippingInfo.base_shipping * multiplier;
  }

  submitOrder() {
    const price = this.orderInfo.price;
    const quantity = this.orderInfo.quantity;
    const subtotal = price * quantity;

    const tax = subtotal * 0.10;
    const shipping = this.getTotalShippingCost(); 

    const total = subtotal + tax + shipping;

    const payload = {
      item_name: this.orderInfo.item_name,
      quantity,
      weight: this.orderInfo.weight,
      total_amount: total
    };

    this.orderService.addOrder(payload).pipe(take(1)).subscribe({
      next: () => {
        this.loadOrders();
        this.resetForm();
      },
      error: (err) => console.error('Order submit error:', err)
    });
  }


  submitShipping() {
    const payload = {
      carrier: this.shippingInfo.carrier,
      name: this.shippingInfo.name,
      phone: this.shippingInfo.address.phone,
      address_line1: this.shippingInfo.address.address_line1,
      city_locality: this.shippingInfo.address.city_locality,
      state_province: this.shippingInfo.address.state_province,
      postal_code: this.shippingInfo.address.postal_code,
      country_code: this.shippingInfo.address.country_code,
      base_shipping: this.shippingInfo.base_shipping
    };

    this.shippingService.postShipping(payload).pipe(take(1)).subscribe({
      next: () => console.log('Shipping sent'),
      error: (err) => console.error('Shipping error:', err)
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).pipe(take(1)).subscribe({
      next: () => {
        const updated = this.orders$.value.filter(order => order.id !== id);
        this.orders$.next(updated);
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }

  resetForm() {
    this.orderInfo = {
      item_name: '',
      quantity: 1,
      weight: 1,
      price: 0
    };

    this.shippingInfo = {
      carrier: '',
      name: '',
      base_shipping: 20,
      address: {
        phone: '',
        address_line1: '',
        city_locality: '',
        state_province: '',
        postal_code: '',
        country_code: ''
      }
    };
  }
}
