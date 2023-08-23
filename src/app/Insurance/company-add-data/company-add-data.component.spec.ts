import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddDataComponent } from './company-add-data.component';

describe('CompanyAddDataComponent', () => {
  let component: CompanyAddDataComponent;
  let fixture: ComponentFixture<CompanyAddDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAddDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
