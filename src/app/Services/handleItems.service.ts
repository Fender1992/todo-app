import { Injectable } from '@angular/core';
import { Item } from '../Model/items.model';

@Injectable()
export class HandleItems {
  public item: Item[] = [];
}
