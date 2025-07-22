import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleUppercase',
  standalone: true
})
export class TitleUppercasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
