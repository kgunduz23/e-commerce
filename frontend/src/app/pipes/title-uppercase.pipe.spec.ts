import { TestBed } from '@angular/core/testing';

import { TitleUppercasePipe } from './title-uppercase.pipe';

describe('TitleUppercasePipe', () => {
  let service: TitleUppercasePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleUppercasePipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
