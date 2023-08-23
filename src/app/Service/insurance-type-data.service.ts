import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InsuranceTypeDataService {
  constructor(private http: HttpClient) {}

  getCustomerInsuranceData() {
    return this.http.get<any>('https://localhost:44342/GetInsuranceData');
  }

  AddInsuranceData(data: any) {
    return this.http.post<any>(
      'https://localhost:44342/PostInsuranceData',
      data
    );
  }

  EditInsuranceData(data: any) {
    return this.http.put<any>('https://localhost:44342/PutInsuranceData', data);
  }

  DeleteInsuranceData(id: number) {
    return this.http.delete<any>(
      `https://localhost:44342/DeleteInsuranceData?id=${id}`
    );
  }
}
