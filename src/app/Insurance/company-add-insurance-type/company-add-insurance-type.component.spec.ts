import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddInsuranceTypeComponent } from './company-add-insurance-type.component';

describe('CompanyAddInsuranceTypeComponent', () => {
  let component: CompanyAddInsuranceTypeComponent;
  let fixture: ComponentFixture<CompanyAddInsuranceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAddInsuranceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAddInsuranceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
