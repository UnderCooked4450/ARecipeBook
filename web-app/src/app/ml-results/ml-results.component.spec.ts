import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlResultsComponent } from './ml-results.component';

describe('MlResultsComponent', () => {
  let component: MlResultsComponent;
  let fixture: ComponentFixture<MlResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MlResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MlResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
