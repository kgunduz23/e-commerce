import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxInfo } from '../../services/tax.service';

@Component({
  selector: 'app-tax-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Tax Information</h3>
    <p>Tax Rate: {{ tax.amount * 100 }}%</p>

  `
})
export class TaxInfoComponent {
  @Input() tax!: TaxInfo;
}
