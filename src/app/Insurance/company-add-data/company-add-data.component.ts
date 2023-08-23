import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceTypeDataService } from 'src/app/Service/insurance-type-data.service';

@Component({
  selector: 'app-company-add-data',
  templateUrl: './company-add-data.component.html',
  styleUrls: ['./company-add-data.component.css'],
})
export class CompanyAddDataComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15, 20];
  InsuranceTypee: any;
  InsuranceForm!: FormGroup;
  ButtonName: string = 'Submit';
  Id: number = 0;
  BtColor: string = 'primary';
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  fname1: any;
  constructor(
    private formBuilder: FormBuilder,
    private InsuranceData: InsuranceTypeDataService
  ) {}

  ngOnInit(): void {
    this.getInsuranceData();
    this.InsuranceForm = this.formBuilder.group({
      InsuranceType: ['', Validators.required],
    });
  }

  getInsuranceData() {
    this.InsuranceData.getCustomerInsuranceData().subscribe({
      next: (res) => {
        this.InsuranceTypee = res;
      },
      error: (er) => console.log(er),
    });
  }

  AddAndUpdateInsuranceData() {
    if (this.Id != 0) {
      console.log(this.InsuranceForm.value);
      let data = {
        id: Number(this.Id),
        InsuranceType: this.InsuranceForm.value.InsuranceType.trim(),
      };
      this.InsuranceData.EditInsuranceData(data).subscribe({
        next: (res) => {
          if (res.success) {
            this.getInsuranceData();
            this.AlertVal = false;
            this.Color = 'success';
            this.Message = res.message;
            setTimeout(() => {
              this.AlertVal = true;
              this.Color = '';
              this.Message = '';
            }, 3500);
          } else {
            this.getInsuranceData();
            this.AlertVal = false;
            this.Color = 'danger';
            this.Message = res.message;
            setTimeout(() => {
              this.AlertVal = true;
              this.Color = '';
              this.Message = '';
            }, 3500);
          }
        },
        error: (er) => {
          this.AlertVal = false;
          this.Color = 'warning';
          this.Message = er.error.text;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        },
      });
      this.Id = 0;
      this.ButtonName = 'Submit';
      this.BtColor = 'primary';
      this.InsuranceForm.reset();
    } else {
      console.log(this.InsuranceForm.value);
      let data = {
        InsuranceType: this.InsuranceForm.value.InsuranceType.trim(),
      };
      this.InsuranceData.AddInsuranceData(data).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.getInsuranceData();
            this.AlertVal = false;
            this.Color = 'success';
            this.Message = res.message;
            setTimeout(() => {
              this.AlertVal = true;
              this.Color = '';
              this.Message = '';
            }, 3500);
          } else {
            this.getInsuranceData();
            this.AlertVal = false;
            this.Color = 'danger';
            this.Message = res.message;
            setTimeout(() => {
              this.AlertVal = true;
              this.Color = '';
              this.Message = '';
            }, 3500);
          }
        },
        error: (er) => {
          this.AlertVal = false;
          this.Color = 'warning';
          this.Message = er.error.text;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        },
      });
      this.InsuranceForm.reset();
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getInsuranceData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getInsuranceData();
  }

  Search() {
    if (this.fname1 != '') {
      let user = this.InsuranceTypee.filter((res: any) => {
        return res.insuranceType
          .toLocaleLowerCase()
          .match(this.fname1.toLocaleLowerCase());
      });
      this.InsuranceTypee = user;
    } else {
      this.getInsuranceData();
    }
  }

  EditData(id: Number) {
    var IData = this.InsuranceTypee.find((x: { id: any }) => x.id === id);
    this.Id = IData.id;
    this.InsuranceForm.controls['InsuranceType'].setValue(IData.insuranceType);
    this.ButtonName = 'Update';
    this.BtColor = 'warning';
  }

  DeleteData(id:number){
    this.InsuranceData.DeleteInsuranceData(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getInsuranceData();
          this.AlertVal = false;
          this.Color = 'success';
          this.Message = res.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        }else{
          this.getInsuranceData();
          this.AlertVal = false;
          this.Color = 'danger';
          this.Message = res.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        }
      },
      error: (er) => {
        this.getInsuranceData();
        this.AlertVal = false;
        this.Color = 'warning';
        this.Message = er.error.text;
        setTimeout(() => {
          this.AlertVal = true;
          this.Color = '';
          this.Message = '';
        }, 3500);
      },
    });
  }
}
