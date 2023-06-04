import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrierenPage } from './registrieren.page';

describe('RegistrierenPage', () => {
  let component: RegistrierenPage;
  let fixture: ComponentFixture<RegistrierenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrierenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
