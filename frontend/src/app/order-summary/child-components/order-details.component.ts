import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItem } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Order Details</h3>
    <ul>
      <li *ngFor="let item of order">
        {{ item.item_name }} x{{ item.quantity }} - {{ item.total_amount | currency }}
      </li>
    </ul>
    <div>Subtotal: {{ calculateSubtotal() | currency }}</div>
  `
})
export class OrderDetailsComponent {
  @Input() order: OrderItem[] = [];

  calculateSubtotal(): number {
    return this.order.reduce((sum, item) => sum + item.total_amount * item.quantity, 0);
  }
}
