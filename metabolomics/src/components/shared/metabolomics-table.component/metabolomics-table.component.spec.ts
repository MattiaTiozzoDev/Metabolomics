import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetabolomicsTableComponent } from './metabolomics-table.component';

describe('MetabolomicsTableComponent', () => {
  let component: MetabolomicsTableComponent;
  let fixture: ComponentFixture<MetabolomicsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetabolomicsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetabolomicsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
