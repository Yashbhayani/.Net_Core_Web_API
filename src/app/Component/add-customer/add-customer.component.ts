import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerDataService } from 'src/app/Service/customer-data.service';
import { InsuranceTypeDataService } from 'src/app/Service/insurance-type-data.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  CustomerForm!: FormGroup;
  InsuranceTypee: any;
  inputDate: any;

  constructor(
    private formBuilder: FormBuilder,
    private customerInsuranceService: CustomerDataService,
    private InsuranceData: InsuranceTypeDataService
  ) {}

  ngOnInit(): void {
    this.getInsuranceData();
    this.CustomerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
        ]),
      ],
      MobileNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      InsuranceType: ['', Validators.required],
      InsuranceAmount: [
        0,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      InsurancePurchaseDate: ['', Validators.required],
    });
  }

  getInsuranceData() {
    this.InsuranceData.getCustomerInsuranceData().subscribe({
      next: (res) => (this.InsuranceTypee = res),
      error: (er) => console.log(er),
    });
  }

  AddInsuranceData() {
    this.inputDate = new Date(this.CustomerForm.value.InsurancePurchaseDate);
    const year = this.inputDate.getFullYear();
    const month = String(this.inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let IDDATA = this.InsuranceTypee.find(
      (x: { insuranceType: any }) =>
        x.insuranceType === this.CustomerForm.value.InsuranceType
    );
    let data = {
      FirstName: this.CustomerForm.value.FirstName,
      LastName: this.CustomerForm.value.LastName,
      Email: this.CustomerForm.value.Email,
      Phone: this.CustomerForm.value.MobileNumber,
      InsuranceType: Number(IDDATA.id),
      Insurance_Amount: this.CustomerForm.value.InsuranceAmount,
      Insurance_Purchase_Date: formattedDate,
    };
    this.customerInsuranceService.AddCustomerInsuranceData(data).subscribe({
      next: (res) => {
        if (res.success) {
          this.AlertVal = false;
          this.Color = 'success';
          this.Message = res.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
          this.CustomerForm.reset();
        } else {
          this.AlertVal = false;
          this.Color = 'warning';
          this.Message = res.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        }
      },
      error: (er) => {
        if (er.success) {
          this.AlertVal = false;
          this.Color = 'success';
          this.Message = er.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
          this.CustomerForm.reset();
        } else {
          this.AlertVal = false;
          this.Color = 'warning';
          this.Message = er.error.text;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        }
      },
    });
  }
}
