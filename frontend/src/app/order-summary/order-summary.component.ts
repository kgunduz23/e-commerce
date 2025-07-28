import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { OrderSummaryService, OrderSummary } from '../services/order-summary.service';
import { OrderItem, OrderService } from '../services/order.service';
import { OrderDetailsComponent } from './child-components/order-details.component';
import { ShippingInfoComponent } from './child-components/shipping-info.component';
import { TaxInfoComponent } from './child-components/tax-info.component';
import { baseApiUrl } from '../../env';

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
  ) {
    this.orderSummary$ = this.summaryService.getOrderSummary(this.newOrder.shipping);

  }

  ngOnInit(): void {
    this.fetchOrders();
    this.resetForm();
  }

  submitOrder() {
    const taxRate = 10;

    const subtotal = this.newOrder.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const taxAmount = (subtotal * taxRate) / 100;

    const shippingTotal = this.newOrder.items.reduce(
      (sum, item) => sum + item.shipping,
      0
    );

    const total = subtotal + taxAmount + shippingTotal;

    const payload = {
      customer_name: this.newOrder.shipping.name,
      total_amount: total,
      tax: taxRate,
      shipping: this.newOrder.shipping,
      items: this.newOrder.items
    };

    this.summaryService.addOrder(payload).subscribe(() => {
      this.fetchOrders();
      this.resetForm();
    });
  }



  fetchOrders() {
    fetch(`${baseApiUrl}/orders`)
      .then(res => res.json())
      .then(data => {
        this.orders = data;
      })
      .catch(err => console.error('Fetching error:', err));
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

  deleteOrder(id: number) {
    fetch(`${baseApiUrl}/orders/${id}`, {
      method: 'DELETE'
    })
      .then(() => this.fetchOrders())
      .catch(err => console.error('Deleting error:', err));
  }

  addItem() {
    this.newOrder.items.push({
      id: this.newOrder.items.length + 1,
      name: '',
      price: 0,
      qty: 1,
      weight: 1,
      shipping: 0
    });
  }

  removeItem(index: number) {
    if (this.newOrder.items.length > 1) {
      this.newOrder.items.splice(index, 1);
    }
  }
}