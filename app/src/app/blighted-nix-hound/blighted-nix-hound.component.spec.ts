import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlightedNixHoundComponent } from './blighted-nix-hound.component';

describe('BlightedNixHoundComponent', () => {
  let component: BlightedNixHoundComponent;
  let fixture: ComponentFixture<BlightedNixHoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlightedNixHoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlightedNixHoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
