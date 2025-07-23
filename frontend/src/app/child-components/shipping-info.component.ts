import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShippingInfo } from '../services/shipping.service';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <fieldset style="border: 1px solid #ccc; padding: 15px;">
      <legend style="font-weight: bold;">Shipping Information</legend>

      <div style="margin-bottom: 10px;">
        <label>Carrier</label>
        <input [(ngModel)]="shipping.carrier" name="carrier" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Receiver Name</label>
        <input [(ngModel)]="shipping.address.name" name="receiver_name" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Phone</label>
        <input [(ngModel)]="shipping.address.phone" name="phone" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Address Line</label>
        <input [(ngModel)]="shipping.address.address_line1" name="address_line1" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>City</label>
        <input [(ngModel)]="shipping.address.city_locality" name="city" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>State</label>
        <input [(ngModel)]="shipping.address.state_province" name="state" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Postal Code</label>
        <input [(ngModel)]="shipping.address.postal_code" name="postal_code" class="form-control" />
      </div>

      <div style="margin-bottom: 10px;">
        <label>Country Code</label>
        <input [(ngModel)]="shipping.address.country_code" name="country_code" class="form-control" />
      </div>
    </fieldset>
  `
})
export class ShippingInfoComponent {
  @Input() shipping!: ShippingInfo;
}
