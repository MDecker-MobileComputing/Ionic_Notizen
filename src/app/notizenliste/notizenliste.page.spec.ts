import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotizenlistePage } from './notizenliste.page';

describe('NotizenlistePage', () => {
  let component: NotizenlistePage;
  let fixture: ComponentFixture<NotizenlistePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotizenlistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
