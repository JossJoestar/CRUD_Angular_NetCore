import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  
  formData: PaymentDetail;
  list: PaymentDetail[];
  payment:PaymentDetail;
  readonly baseURL = 'http://localhost:5000/PaymentDetail';

  constructor(private http: HttpClient) { }

  postPaymentDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  refreshList() {
    this.list = [];
    this.http
      .get<any[]>(this.baseURL).toPromise().then((data) => {
        data.map((e) => {
          this.payment = new PaymentDetail();
          this.payment.PMId = e['pmId'];
          this.payment.CardOwnerName = e['cardOwnerName'];
          this.payment.CardNumber = e['cardNumber'];
          this.payment.ExpirationDate = e['expirationDate'];
          this.payment.CVV = e['cvv'];
          this.list.push(this.payment);
        });
      });
  }

  putPaymentDetail() {
    return this.http.put(this.baseURL + '/'+ this.formData.PMId, this.formData);
  }

  deletePaymentDetail(id) {
    return this.http.delete(this.baseURL + '/'+ id);
  }
  
}
