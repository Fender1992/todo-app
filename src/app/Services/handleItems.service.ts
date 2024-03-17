import { Injectable } from '@angular/core';
import { Item } from '../model/items.model';

@Injectable()
export class HandleItems {
  public item: Item[] = [];
}
