import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxInfo } from '../services/tax.service';

@Component({
  selector: 'app-tax-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Tax Information</h3>
    <div>Tax Rate: {{ tax.amount | percent }}</div>
  `
})
export class TaxInfoComponent {
  @Input() tax!: TaxInfo;
}
