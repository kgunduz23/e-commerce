// shipping-info.component.ts
import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShippingInfo } from '../../services/shipping.service';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <fieldset style="border: 1px solid #ccc; padding: 15px;">
      <legend style="font-weight: bold;">Shipping Information</legend>

      <div style="margin-bottom: 10px;">
        <label>Carrier</label>
        <input [(ngModel)]="shipping.carrier" name="shipping_carrier" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Receiver Name</label>
        <input [(ngModel)]="shipping.name" name="shipping_name" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Phone</label>
        <input [(ngModel)]="shipping.address.phone" name="shipping_phone" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Address Line</label>
        <input [(ngModel)]="shipping.address.address_line1" name="shipping_address_line1" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>City</label>
        <input [(ngModel)]="shipping.address.city_locality" name="shipping_city" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>State</label>
        <input [(ngModel)]="shipping.address.state_province" name="shipping_state" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Postal Code</label>
        <input [(ngModel)]="shipping.address.postal_code" name="shipping_postal" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Country Code</label>
        <input [(ngModel)]="shipping.address.country_code" name="shipping_country" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Base Shipping Cost</label>
        <input [(ngModel)]="shipping.base_shipping" name="base_shipping" type="number" min="0" class="form-control" />
      </div>
    </fieldset>
  `
})
export class ShippingInfoComponent {
  @Input() shipping!: ShippingInfo;
}
