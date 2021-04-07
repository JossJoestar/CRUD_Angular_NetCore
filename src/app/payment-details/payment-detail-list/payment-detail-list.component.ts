import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css'],
})
export class PaymentDetailListComponent implements OnInit {
  constructor(public service: PaymentDetailService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(pd: PaymentDetail) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(PMId) {
    if (confirm('Seguro de eliminar este pago?')) {
      this.service.deletePaymentDetail(PMId)
        .subscribe(res => {
          debugger;
          this.service.refreshList();
          this.toastr.warning('Eliminado exitosamente', 'Registro de pagos');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }
}
