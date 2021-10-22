import { Pipe, PipeTransform } from '@angular/core';
import { Layer } from '../layer-item/layer.model';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: Layer[], ...args: unknown[]): Layer[] {
    return value.reverse();
  }

}
