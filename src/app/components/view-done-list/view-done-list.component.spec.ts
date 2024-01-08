import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoneListComponent } from './view-done-list.component';

describe('ViewDoneListComponent', () => {
  let component: ViewDoneListComponent;
  let fixture: ComponentFixture<ViewDoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDoneListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
