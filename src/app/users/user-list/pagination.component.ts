// users/user-list/pagination.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;
    @Output() pageChange = new EventEmitter<number>();

    constructor() { }

    onPageChange(page: number) {
        this.pageChange.emit(page);
    }
}
