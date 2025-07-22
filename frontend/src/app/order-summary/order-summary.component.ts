import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderSummaryService, OrderSummary } from '../services/order-summary.service';
import { TitleUppercasePipe } from '../pipes/title-uppercase.pipe';
import { WeightPipe } from '../pipes/weight.pipe';
import { Observable } from 'rxjs';
import { OrderItem } from '../services/order.service';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleUppercasePipe, WeightPipe], 
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css'
})
export class OrderSummaryComponent {
  orderSummary$: Observable<OrderSummary>;

  newOrder = {
  customer_name: '',
  price: 0,
  tax: 0,
  shipping_cost: 0,
  total_amount: 0
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
  }

  submitOrder() {
    const { price, tax, shipping_cost } = this.newOrder;
    const taxAmount = price * (tax / 100);
    const total = price + taxAmount + shipping_cost;

    const orderToSend = {
      customer_name: this.newOrder.customer_name,
      total_amount: total,
      tax: tax,
      shipping_cost: shipping_cost
    };

  fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderToSend)
  })
    .then(res => res.json())
    .then(data => {
      this.fetchOrders();
      this.newOrder = { customer_name: '', price: 0, tax: 0, shipping_cost: 0, total_amount: 0 };
    })
    .catch(err => console.error('Sending error:', err));
}


  fetchOrders() {
    fetch('http://localhost:3000/orders')
      .then(res => res.json())
      .then(data => {
        this.orders = data;
      })
      .catch(err => console.error('Taking error:', err));
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
    console.log('Deleted ID:', id);
    fetch(`http://localhost:3000/orders/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.fetchOrders(); 
      })
      .catch(err => console.error('Deleting error:', err));
  }


}
