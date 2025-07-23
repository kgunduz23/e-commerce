import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
//import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrderSummaryComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
