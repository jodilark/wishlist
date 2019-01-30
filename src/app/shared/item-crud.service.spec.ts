import { TestBed } from '@angular/core/testing';

import { ItemCrudService } from './item-crud.service';

describe('ItemCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemCrudService = TestBed.get(ItemCrudService);
    expect(service).toBeTruthy();
  });
});
