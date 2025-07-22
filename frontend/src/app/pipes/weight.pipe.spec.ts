import { TestBed } from '@angular/core/testing';

import { WeightPipe } from './weight.pipe';

describe('WeightPipe', () => {
  let service: WeightPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightPipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
