import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AddCustomerComponent } from './Component/add-customer/add-customer.component';
import { CompanyAddInsuranceTypeComponent } from './Insurance/company-add-insurance-type/company-add-insurance-type.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddCustomerComponent },
  { path: 'addinsurancetype', component: CompanyAddInsuranceTypeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
