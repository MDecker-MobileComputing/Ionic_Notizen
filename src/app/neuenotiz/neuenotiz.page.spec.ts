import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NeuenotizPage } from './neuenotiz.page';

describe('NeuenotizPage', () => {
  let component: NeuenotizPage;
  let fixture: ComponentFixture<NeuenotizPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NeuenotizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
