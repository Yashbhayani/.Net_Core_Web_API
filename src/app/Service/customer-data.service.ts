import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  constructor(private http: HttpClient) {}

  /*
  private apiUrl = 'https://localhost:44342';


  getCustomerInsuranceData(): Observable<any> {
    const endpoint = '/GetCustomerInsuranceData';
    return this.http.get(`${this.apiUrl}${endpoint}`);
  }*/

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

  /*
  patchCustomerInsuranceData(data1: any, data2:any) {
    return this.http.get<any>(
      `https://localhost:44342/PatchMinMaxCustomerInsuranceData?MinClass=${data1}&MaxClass=${data2}`
    );
  }*/

  /*
  GetCustomerInsuranceData(id:Number) {
    return this.http.get<any>(
      'https://localhost:44342/api/Customer/CustomersInfoid?id='+id
    );
  }*/
  /*
  headtok() {
    let api_key = "Yash Bhayani";
    const headerDict = {
      Authorization: api_key,
    };

    const requestOptionss = {
      headers: new HttpHeaders(headerDict),
    };
  }
*/
}
