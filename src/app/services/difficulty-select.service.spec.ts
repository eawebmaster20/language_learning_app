import { TestBed } from '@angular/core/testing';

import { DifficultySelectService } from './difficulty-select.service';

describe('DifficultySelectService', () => {
  let service: DifficultySelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifficultySelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
