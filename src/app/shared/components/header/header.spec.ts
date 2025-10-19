import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DEFAULT_ROUTES, Header } from './header';
import { ActivatedRoute, NavigationEnd, provideRouter, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent { }

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue([
                  { path: 'photos', component: DummyComponent },
                  { path: 'favorites', component: DummyComponent },
                ])
              }
            },
          },
        }
      ],
    })
      .compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two default routes', () => {
    expect(component.defaultRoutes.length).toBe(2);
    expect(component.defaultRoutes[0].path).toBe(DEFAULT_ROUTES.PHOTOS);
    expect(component.defaultRoutes[1].path).toBe(DEFAULT_ROUTES.FAVORITES);
  });

  it('should set activePath as "photos" initially', () => {
    expect(component.activePath()).toBe('photos');
  });

  it('should render Photos and Favorites buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Photos');
    expect(buttons[1].textContent).toContain('Favorites');
  });
});
