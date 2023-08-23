import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { CustomerDataService } from 'src/app/Service/customer-data.service';
import { InsuranceTypeDataService } from 'src/app/Service/insurance-type-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  fname1: any;
  productForm!: FormGroup;
  CustomerEditForm!: FormGroup;
  Customer: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15, 20];
  InsuranceTypee: any;
  InsuranceTypeee: any;
  inputDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private customerInsuranceService: CustomerDataService,
    private InsuranceData: InsuranceTypeDataService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Min_Value: [],
      Max_Value: [],
      InsuranceType: [],
      InsurancePurchaseDate: [],
    });
    this.getallfunction();
    this.getInsuranceData();
    this.getnewInsuranceData();
    this.EditForm();
  }

  getallfunction() {
    this.customerInsuranceService.getCustomerInsuranceData().subscribe({
      next: (res) => {
        this.Customer = res;
      },
      error: (er) => {},
    });
  }

  getInsuranceData() {
    this.InsuranceData.getCustomerInsuranceData().subscribe({
      next: (res) => {
        this.InsuranceTypeee = res;
        let newData = {
          id: 0,
          insuranceType: 'All Insurance',
        };
        this.InsuranceTypeee.unshift(newData);
      },
      error: (er) => console.log(er),
    });
  }

  getnewInsuranceData() {
    this.InsuranceData.getCustomerInsuranceData().subscribe({
      next: (res) => {
        this.InsuranceTypee = res;
      },
      error: (er) => console.log(er),
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getallfunction();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getallfunction();
  }

  Search() {
    if (this.fname1 != '') {
      let user = this.Customer.filter((res: any) => {
        return (
          res.firstName
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.lastName
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.email
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.phone
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.insuranceType
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.insurance_Amount
            .toString()
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase()) ||
          res.insurance_Purchase_Date
            .toLocaleLowerCase()
            .match(this.fname1.toLocaleLowerCase())
        );
      });
      this.Customer = user;
    } else {
      this.getallfunction();
    }
  }

  Openmodel(ID: number) {
    const EditModel = document.getElementById('editModal');
    if (EditModel != null) {
      this.getnewInsuranceData();
      EditModel.style.display = 'block';
      let DATA = this.Customer.find((x: { id: any }) => x.id === ID);
      this.inputDate = new Date(DATA.insurance_Purchase_Date);
      this.CustomerEditForm.controls['Id'].setValue(DATA.id);
      this.CustomerEditForm.controls['FirstName'].setValue(DATA.firstName);
      this.CustomerEditForm.controls['LastName'].setValue(DATA.lastName);
      this.CustomerEditForm.controls['Email'].setValue(DATA.email);
      this.CustomerEditForm.controls['MobileNumber'].setValue(DATA.phone);
      this.CustomerEditForm.controls['InsuranceType'].setValue(
        DATA.insuranceType
      );
      this.CustomerEditForm.controls['InsuranceAmount'].setValue(
        DATA.insurance_Amount
      );
      this.CustomerEditForm.controls['InsurancePurchaseDate'].setValue(
        this.inputDate
      );
    }
  }

  Closemodel() {
    const EditModel = document.getElementById('editModal');
    if (EditModel != null) {
      EditModel.style.display = 'none';
      this.getallfunction();
    }
  }

  EditForm() {
    this.CustomerEditForm = this.formBuilder.group({
      Id: [0, Validators.required],
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

  EditInsuranceData() {
    this.inputDate = new Date(
      this.CustomerEditForm.value.InsurancePurchaseDate
    );
    const year = this.inputDate.getFullYear();
    const month = String(this.inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.inputDate.getDate()).padStart(2, '0');
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
        if (res.success) {
          this.getallfunction();
          this.AlertVal = false;
          this.Color = 'success';
          this.Message = res.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        } else {
          this.getallfunction();
          this.AlertVal = false;
          this.Color = 'info';
          this.Message = res.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        }
        this.Closemodel();
      },
      error: (er) => {
        this.Closemodel();
      },
    });
  }

  DeleteCustomer(ID: number) {
    this.customerInsuranceService.DeleteCustomerInsuranceData(ID).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.getallfunction();
          this.AlertVal = false;
          this.Color = 'success';
          this.Message = res.error.text;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        }
      },
      error: (er) => {
        this.getallfunction();
        this.AlertVal = false;
        this.Color = 'success';
        this.Message = er.error.text;
        setTimeout(() => {
          this.AlertVal = true;
          this.Color = '';
          this.Message = '';
        }, 3500);
      },
    });
  }

  MinMax() {
    let ID = 0;
    if (this.productForm.value.InsuranceType != null) {
      let InID = this.InsuranceTypee.find(
        (x: { insuranceType: any }) =>
          x.insuranceType === this.productForm.value.InsuranceType
      );
      ID = InID.id;
    }

    let Min = 0;
    if (this.productForm.value.Min_Value != null) {
      Min = this.productForm.value.Min_Value;
    }

    let Max = 0;
    if (this.productForm.value.Max_Value != null) {
      Max = this.productForm.value.Max_Value;
    }

    let date = '';
    if (this.productForm.value.InsurancePurchaseDate != null) {
      this.inputDate = new Date(this.productForm.value.InsurancePurchaseDate);
      let year = this.inputDate.getFullYear();
      let month = String(this.inputDate.getMonth() + 1).padStart(2, '0');
      let day = String(this.inputDate.getDate()).padStart(2, '0');
      date = `${year}-${month}-${day}`;
    }
    // debugger;
    if (Min == 0 && Max == 0 && ID == 0 && date == null) {
      this.getallfunction();
    } else if (
      (Min !== 0 && Max === 0 && ID === 0 && date === null) ||
      (Max !== 0 && Min === 0 && ID === 0 && date === null)
    ) {
      this.getallfunction();
    } else {
      let Data = {
        MinValue: Min,
        MaxValue: Max,
        InsuranceType: ID,
        InsurancePurchaseDate: date,
      };

      this.customerInsuranceService.patchCustomerInsuranceData(Data).subscribe({
        next: (res) => {
          this.Customer = res;
        },
        error: (err) => console.log(err),
      });
    }
  }

  Reset() {
    this.getallfunction();
    this.productForm.reset();
  }
}
