import { TestBed, inject } from '@angular/core/testing';

import { OutpostsService } from './outposts.service';

describe('OutpostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutpostsService]
    });
  });

  it('should be created', inject([OutpostsService], (service: OutpostsService) => {
    expect(service).toBeTruthy();
  }));
});
