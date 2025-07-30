import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxInfo } from '../../services/tax.service';
import { TitleUppercasePipe } from "../../pipes/title-uppercase.pipe";

@Component({
  selector: 'app-tax-info',
  standalone: true,
  imports: [CommonModule, TitleUppercasePipe],
  template: `
    <h3>{{ 'Tax Info' | titleUppercase }}</h3>
    <p>Tax Rate: {{ tax.amount * 100 }}%</p>
  `
})
export class TaxInfoComponent {
  @Input() tax!: TaxInfo;
}
