import { TestBed } from '@angular/core/testing';

import { FlowbitService } from './flowbit.service';

describe('FlowbitService', () => {
  let service: FlowbitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
