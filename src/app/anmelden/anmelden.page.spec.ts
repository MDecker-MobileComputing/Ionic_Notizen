import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnmeldenPage } from './anmelden.page';

describe('AnmeldenPage', () => {
  let component: AnmeldenPage;
  let fixture: ComponentFixture<AnmeldenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnmeldenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
