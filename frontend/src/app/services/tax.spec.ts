import { TestBed } from '@angular/core/testing';

import { TaxService } from './tax.service';

describe('Tax', () => {
  let service: TaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
