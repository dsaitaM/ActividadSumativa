import { TestBed } from '@angular/core/testing';

import { NotaServService } from './nota-serv.service';

describe('NotaServService', () => {
  let service: NotaServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
