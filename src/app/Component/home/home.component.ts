import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from 'src/app/Service/customer-data.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewCustomerComponent } from '../view-customer/view-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { InsuranceTypeDataService } from 'src/app/Service/insurance-type-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayedColumns: string[] = [
    'id',
    'FirstName',
    'LastName',
    'InsuranceType',
    'Insurance_Amount',
    'View',
    'Edit',
    'Delete',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private customerInsuranceService: CustomerDataService,
    private InsuranceData: InsuranceTypeDataService,
    private dialog: MatDialog
  ) {}

  productForm!: FormGroup;
  Customer: any;
  InsuranceTypee: any;
  AlertVal: boolean = true;
  Message: string = '';
  Color: string = '';

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Min_Value: [],
      Max_Value: [],
      InsuranceType: [],
      InsurancePurchaseDate: [],
    });
    this.getallfunction();
    this.getInsuranceData();
  }

  getallfunction() {
    this.customerInsuranceService.getCustomerInsuranceData().subscribe({
      next: (res) => {
        this.Customer = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (er) => {},
    });
  }

  getInsuranceData() {
    this.InsuranceData.getCustomerInsuranceData().subscribe({
      next: (res) => {
        this.InsuranceTypee = res;
        let newData  ={
          id : 0,
          insuranceType:"All Insurance"
          }
          this.InsuranceTypee.unshift(newData);
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

  MinMax() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
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
        let inputDate = new Date(this.productForm.value.InsurancePurchaseDate);
        let year = inputDate.getFullYear();
        let month = String(inputDate.getMonth() + 1).padStart(2, '0');
        let day = String(inputDate.getDate()).padStart(2, '0');
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

        console.log(Data);
        this.customerInsuranceService
          .patchCustomerInsuranceData(Data)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.dataSource = new MatTableDataSource(res);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            error: (err) => console.log(err),
          });
      }
      /*
        this.customerInsuranceService.GetCustomerInsuranceData(this.productForm.value.Min_Value).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error :(err)=>console.log(err),
      });*/
      /*
      this.customerInsuranceService.patchCustomerInsuranceData(Data.MinValue, Data.MaxValue).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error :(err)=>console.log(err),
      });*/
    }
  }

  Reset() {
    this.getallfunction();
    this.productForm.reset();
  }

  openViewDialog(AData: any) {
    this.dialog
      .open(ViewCustomerComponent, {
        width: '50%',
        height: '65%',
        data: AData,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Save') {
          this.getallfunction();
        }
      });
  }

  ViewData(id: Number) {
    let IDDATA = this.Customer.find((x: { id: any }) => x.id === id);
    this.openViewDialog(IDDATA);
  }

  Editdata(id: Number) {
    let IDDATA = this.Customer.find((x: { id: any }) => x.id === id);
    this.openEditDialog(IDDATA);
  }

  openEditDialog(AData: any) {
    this.dialog
      .open(EditCustomerComponent, {
        width: '70%',
        height: '86.5',
        data: AData,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val.success) {
          this.getallfunction();
          this.AlertVal = false;
          this.Color = 'success';
          this.Message = val.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        } else {
          this.getallfunction();
          this.AlertVal = false;
          this.Color = 'info';
          this.Message = val.message;
          setTimeout(() => {
            this.AlertVal = true;
            this.Color = '';
            this.Message = '';
          }, 3500);
        }
      });
  }

  Deletedata(Adata: Number) {
    this.customerInsuranceService.DeleteCustomerInsuranceData(Adata).subscribe({
      next: (res) => {
        console.log(res);
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
}
