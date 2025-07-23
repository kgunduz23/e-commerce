import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { OrderSummaryService, OrderSummary } from '../services/order-summary.service';
import { OrderItem } from '../services/order.service';

import { OrderService } from '../services/order.service';
import { TitleUppercasePipe } from '../pipes/title-uppercase.pipe';
import { WeightPipe } from '../pipes/weight.pipe';

import { OrderDetailsComponent } from '../child-components/order-details.component';
import { ShippingInfoComponent } from '../child-components/shipping-info.component';
import { TaxInfoComponent } from '../child-components/tax-info.component';

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

  newOrder = {
    customer_name: '',
    price: 0,
    tax: 0,
    shipping: {
      carrier: '',
      cost: 0,
      address: {
        name: '',
        phone: '',
        address_line1: '',
        city_locality: '',
        state_province: '',
        postal_code: '',
        country_code: ''
      }
    }
  };

  orders: any[] = [];

  constructor(
    private summaryService: OrderSummaryService,
    private orderService: OrderService
  ) {
    this.orderSummary$ = this.summaryService.getOrderSummary();
  }

  ngOnInit(): void {
    this.fetchOrders();
    this.resetForm();
  }

  submitOrder() {
    fetch('http://localhost:3000/tax')
      .then(res => res.json())
      .then(taxRes => {
        const taxAmount = this.newOrder.price * taxRes.tax.amount;
        this.newOrder.tax = taxRes.tax.amount * 100;
        this.newOrder.shipping.cost = this.newOrder.shipping.cost || 0;

        const total = this.newOrder.price + taxAmount + this.newOrder.shipping.cost;

        const orderToSend = {
          customer_name: this.newOrder.customer_name,
          total_amount: total,
          tax: this.newOrder.tax,
          shipping: this.newOrder.shipping
        };

        return fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderToSend)
        });
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add order');
        return res.json();
      })
      .then(() => {
        this.fetchOrders();
        this.resetForm();
      })
      .catch(err => console.error('Sending error:', err));
  }

  fetchOrders() {
    fetch('http://localhost:3000/orders')
      .then(res => res.json())
      .then(data => {
        this.orders = data;
      })
      .catch(err => console.error('Fetching error:', err));
  }

  resetForm() {
    this.newOrder = {
      customer_name: '',
      price: 0,
      tax: 0,
      shipping: {
        carrier: '',
        cost: 0,
        address: {
          name: '',
          phone: '',
          address_line1: '',
          city_locality: '',
          state_province: '',
          postal_code: '',
          country_code: ''
        }
      }
    };
  }

  itemSubtotal(orderItems: OrderItem[] = []): number {
    return orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  calculateTotal(summary: OrderSummary | null | undefined): number {
    if (!summary) return 0;
    const subtotal = this.itemSubtotal(summary.order);
    const tax = subtotal * summary.tax.amount;
    const shipping = summary.shipping.cost;
    return subtotal + tax + shipping;
  }

  deleteOrder(id: number) {
    fetch(`http://localhost:3000/orders/${id}`, {
      method: 'DELETE'
    })
      .then(() => this.fetchOrders())
      .catch(err => console.error('Deleting error:', err));
  }
}
