import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteJobsComponent } from './favourite-jobs.component';

describe('FavouriteJobsComponent', () => {
  let component: FavouriteJobsComponent;
  let fixture: ComponentFixture<FavouriteJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
