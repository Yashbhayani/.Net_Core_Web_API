import { TestBed } from '@angular/core/testing';

import { InsuranceTypeDataService } from './insurance-type-data.service';

describe('InsuranceTypeDataService', () => {
  let service: InsuranceTypeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceTypeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
