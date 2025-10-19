import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { provideHttpClient } from '@angular/common/http';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
