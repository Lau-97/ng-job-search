import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { ROUTER_TOKENS } from '../../app.routes.constant';

@Component({ template: '' })
class DummyJobsComponent {}

@Component({ template: '' })
class DummyFavouritesComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let routerEvents$: Subject<any>;

  beforeEach(async () => {
    routerEvents$ = new Subject();
    routerMock = jasmine.createSpyObj(
      'Router',
      ['navigate', 'createUrlTree', 'serializeUrl'],
      {
        events: routerEvents$.asObservable(),
      }
    );

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule.withRoutes([
          { path: ROUTER_TOKENS.HOME + '/' + ROUTER_TOKENS.JOBS, component: DummyJobsComponent },
          { path: ROUTER_TOKENS.HOME + '/' + ROUTER_TOKENS.FAVOURITES, component: DummyFavouritesComponent },
        ]),]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
