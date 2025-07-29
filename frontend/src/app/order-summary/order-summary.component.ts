import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { OrderSummaryService, OrderSummary } from '../services/order-summary.service';
import { OrderItem, OrderService } from '../services/order.service';
import { OrderDetailsComponent } from './child-components/order-details.component';
import { ShippingInfoComponent } from './child-components/shipping-info.component';
import { TaxInfoComponent } from './child-components/tax-info.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ShippingInfoComponent,
    TaxInfoComponent,
    OrderDetailsComponent
  ],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css'
})
export class OrderSummaryComponent implements OnInit {
  orderSummary$: Observable<OrderSummary>;
  orders: any[] = [];

  newOrder = {
    tax: 10,
    shipping: {
      carrier: '',
      name: '',
      address: {
        phone: '',
        address_line1: '',
        city_locality: '',
        state_province: '',
        postal_code: '',
        country_code: ''
      }
    },
    items: [
      {
        id: 1,
        name: '',
        price: 0,
        qty: 1,
        weight: 1,
        shipping: 0
      }
    ] as OrderItem[]
  };

  constructor(
    private summaryService: OrderSummaryService,
    private orderService: OrderService
  ) {
    this.orderSummary$ = this.summaryService.getOrderSummary(this.newOrder.shipping);
  }

  ngOnInit(): void {
    this.loadOrders();
    this.resetForm();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Fetching error:', err)
    });
  }

  getShippingMultiplier(): number {
    const totalWeight = this.newOrder.items.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight >= 5 && totalWeight < 10) return 2;
    if (totalWeight >= 10 && totalWeight < 15) return 3;
    if (totalWeight >= 15 && totalWeight < 20) return 4;
    if (totalWeight >= 20) return 5;
    return 1;
  }

  getTotalShippingCost(): number {
    const enteredShipping = this.newOrder.items.reduce((sum, item) => sum + item.shipping, 0);
    return enteredShipping * this.getShippingMultiplier();
  }

  submitOrder() {
    const taxRate = 10;

    const subtotal = this.newOrder.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const taxAmount = (subtotal * taxRate) / 100;
    const shippingTotal = this.getTotalShippingCost();
    const total = subtotal + taxAmount + shippingTotal;

    const { carrier, name, address } = this.newOrder.shipping;

    const payload = {
      customer_name: name,
      total_amount: total,
      tax: taxRate,
      shipping: {
        carrier,
        name,
        address  
      },
      items: this.newOrder.items
    };


    this.summaryService.addOrder(payload).subscribe(() => {
      this.loadOrders();
      this.resetForm();
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.orders = this.orders.filter(order => order.id !== id); 
      },
      error: (err) => {
        console.error('Delete failed:', err);
      }
    });
  }
  resetForm() {
    this.newOrder = {
      tax: 10,
      shipping: {
        carrier: '',
        name: '',
        address: {
          phone: '',
          address_line1: '',
          city_locality: '',
          state_province: '',
          postal_code: '',
          country_code: ''
        }
      },
      items: [
        {
          id: 1,
          name: '',
          price: 0,
          qty: 1,
          weight: 1,
          shipping: 0
        }
      ]
    };
  }
}
