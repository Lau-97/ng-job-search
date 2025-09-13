import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
 let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject();
    routerMock = jasmine.createSpyObj('Router', ['navigate'], {
      events: routerEvents$.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [HomeComponent, MatTabsModule, BrowserAnimationsModule],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to correct route on tab change', () => {
    component.onTabChange({ index: 1 } as any); 
    expect(routerMock.navigate).toHaveBeenCalledWith(['home', 'favourites']);

    component.onTabChange({ index: 0 } as any); 
    expect(routerMock.navigate).toHaveBeenCalledWith(['home', 'jobs']);
  });
});
