/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserProfile4Service } from './user-profile4.service';

describe('Service: UserProfile4', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProfile4Service]
    });
  });

  it('should ...', inject([UserProfile4Service], (service: UserProfile4Service) => {
    expect(service).toBeTruthy();
  }));
});
