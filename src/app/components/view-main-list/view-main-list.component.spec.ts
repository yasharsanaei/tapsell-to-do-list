import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMainListComponent } from './view-main-list.component';

describe('ViewMainListComponent', () => {
  let component: ViewMainListComponent;
  let fixture: ComponentFixture<ViewMainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMainListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
