import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent {
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public AData: any,
    private dialogRef: MatDialogRef<ViewCustomerComponent>
  ) {}

  ngOnInit(): void {}
}
