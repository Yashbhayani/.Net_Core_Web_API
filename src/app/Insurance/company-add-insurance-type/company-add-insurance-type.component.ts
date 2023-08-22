import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InsuranceTypeDataService } from 'src/app/Service/insurance-type-data.service';

@Component({
  selector: 'app-company-add-insurance-type',
  templateUrl: './company-add-insurance-type.component.html',
  styleUrls: ['./company-add-insurance-type.component.css'],
})
export class CompanyAddInsuranceTypeComponent {
  InsuranceForm!: FormGroup;
  InsuranceTypee: any;
  ButtonName: string = 'Submit';
  Id: number = 0;
  BtColor: string = 'primary';
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';
  Page: number = 0;

  displayedColumns: string[] = ['id', 'InsuranceType', 'Edit', 'Delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private formBuilder: FormBuilder,
    private InsuranceData: InsuranceTypeDataService
  ) {}

  ngOnInit() {
    this.getInsuranceData();
    this.InsuranceForm = this.formBuilder.group({
      InsuranceType: ['', Validators.required],
    });
  }

  getInsuranceData() {
    this.InsuranceData.getCustomerInsuranceData().subscribe({
      next: (res) => {
        this.InsuranceTypee = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.Page = this.dataSource.paginator.pageIndex + 1;
      },
      error: (er) => console.log(er),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  EditData(id: Number) {
    var IData = this.InsuranceTypee.find((x: { id: any }) => x.id === id);
    this.Id = IData.id;
    this.InsuranceForm.controls['InsuranceType'].setValue(IData.insuranceType);
    this.ButtonName = 'Update';
    this.BtColor = 'accent';
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
