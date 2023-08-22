import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { CustomerDataService } from 'src/app/Service/customer-data.service';
import { InsuranceTypeDataService } from 'src/app/Service/insurance-type-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent {
  CustomerEditForm!: FormGroup;
  InsuranceTypee: any;

  constructor(
    private formBuilder: FormBuilder,
    private InsuranceData: InsuranceTypeDataService,
    private customerInsuranceService: CustomerDataService,
    @Inject(MAT_DIALOG_DATA) public AData: any,
    private dialogRef: MatDialogRef<EditCustomerComponent>
  ) {}

  ngOnInit() {
    this.CustomerEditForm = this.formBuilder.group({
      Id: ['', Validators.required],
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
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      InsurancePurchaseDate: ['', Validators.required],
    });

    this.getInsuranceData();
    this.CustomerEditForm.controls['Id'].setValue(this.AData.id);
    this.CustomerEditForm.controls['FirstName'].setValue(this.AData.firstName);
    this.CustomerEditForm.controls['LastName'].setValue(this.AData.lastName);
    this.CustomerEditForm.controls['Email'].setValue(this.AData.email);
    this.CustomerEditForm.controls['MobileNumber'].setValue(this.AData.phone);
    this.CustomerEditForm.controls['InsuranceType'].setValue(
      this.AData.insuranceType
    );
    this.CustomerEditForm.controls['InsuranceAmount'].setValue(
      this.AData.insurance_Amount
    );
    this.CustomerEditForm.controls['InsurancePurchaseDate'].setValue(
      this.AData.insurance_Purchase_Date
    );
  }

  getInsuranceData() {
    this.InsuranceData.getCustomerInsuranceData().subscribe({
      next: (res) => (this.InsuranceTypee = res),
      error: (er) => console.log(er),
    });
  }

  EditInsuranceData() {
    const inputDate = new Date(
      this.CustomerEditForm.value.InsurancePurchaseDate
    );
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let IDDATA = this.InsuranceTypee.find(
      (x: { insuranceType: any }) =>
        x.insuranceType === this.CustomerEditForm.value.InsuranceType
    );
    let data = {
      id: this.CustomerEditForm.value.Id,
      FirstName: this.CustomerEditForm.value.FirstName,
      LastName: this.CustomerEditForm.value.LastName,
      Email: this.CustomerEditForm.value.Email,
      Phone: this.CustomerEditForm.value.MobileNumber,
      InsuranceType: Number(IDDATA.id),
      Insurance_Amount: this.CustomerEditForm.value.InsuranceAmount,
      Insurance_Purchase_Date: formattedDate,
    };
    this.customerInsuranceService.UpdateCustomerInsuranceData(data).subscribe({
      next: (res) => {
          this.dialogRef.close(res);
      },
      error: (er) => {
        this.dialogRef.close(er);
      },
    });
  }
}
