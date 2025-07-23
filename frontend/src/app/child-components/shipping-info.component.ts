import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingInfo } from '../services/shipping.service';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Shipping Information</h3>
    <div><strong>Carrier:</strong> {{ shipping.carrier }}</div>
    <div><strong>Address:</strong></div>
    <ul>
      <li>{{ shipping.address.name }}</li>
      <li>{{ shipping.address.phone }}</li>
      <li>{{ shipping.address.address_line1 }}</li>
      <li>{{ shipping.address.city_locality }}, {{ shipping.address.state_province }}</li>
      <li>{{ shipping.address.postal_code }} {{ shipping.address.country_code }}</li>
    </ul>
    <div><strong>Shipping Cost:</strong> {{ shipping.cost | currency }}</div>
  `
})
export class ShippingInfoComponent {
  @Input() shipping!: ShippingInfo;
}
