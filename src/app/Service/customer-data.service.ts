import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  constructor(private http: HttpClient) {}

  getCustomerInsuranceData() {
    return this.http.get<any>(
      'https://localhost:44342/GetCustomerInsuranceData'
    );
  }

  patchCustomerInsuranceData(data: any) {
    return this.http.patch<any>(
      'https://localhost:44342/PatchMinMaxCustomerInsuranceData',
      data
    );
  }

  AddCustomerInsuranceData(data: any) {
    return this.http.post<any>(
      'https://localhost:44342/AddCustomerInsuranceData',
      data
    );
  }

  UpdateCustomerInsuranceData(data: any) {
    return this.http.put<any>(
      'https://localhost:44342/UpdateCustomerInsuranceData',
      data
    );
  }

  DeleteCustomerInsuranceData(id: any) {
    return this.http.delete<any>(
      `https://localhost:44342/DeleteCustomerInsuranceData?id=${id}`
    );
  }
}
