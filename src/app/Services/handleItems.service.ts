import { Injectable } from '@angular/core';
import { Item } from '../Model/items.model';

@Injectable()
export class HandleItems {
  public item: Item[] = [{ task: 'Wash Cloths' }, { task: 'Clean Kitchen' }];

  // addItem(item: Item) {}
}
