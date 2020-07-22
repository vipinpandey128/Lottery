import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService } from '../../Shared/PaginationService';
import { PaymentDetailsModel } from '../Models/app.PaymentDetailsModel';


@Component({
    selector: 'paymentlist',
    templateUrl: './app.Paymentlist.component.html',
    styleUrls: [
    ]
})

export class PaymentListComponent 
{

    paydataSource = new MatTableDataSource<PaymentDetailsModel>();
    displayedColumns: string[] = ['PaymentID', 'MemberNo', 'MemberName', 'PlanName','SchemeName', 'PaymentAmount', 'NextRenwalDate', 'PaymentFromdt', 'PaymentTodt','PrintAction'];

    @Input('paydataSource')
    set dataSourceForTable(value: PaymentDetailsModel[]) {
        this.paydataSource = new MatTableDataSource<PaymentDetailsModel>(value);
    }

    @Input() paytotalCount: number;
    @Output() applyFilterEvent = new EventEmitter();
    @Output() payonPageSwitch = new EventEmitter();

    constructor(public paginationService: PaginationService) { }

    applyFilter(filterValue: string) {
        this.paydataSource.filter = filterValue.trim().toLowerCase();
      }
}
