import { Subscriber, Observable } from 'rxjs';
import { ShowMessageService } from './../../../../_services/show-message.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';
import { RoleService } from 'src/app/_services/role/role.service';

@Component({
  selector: 'app-modal-list-users',
  templateUrl: './modal-list-users.component.html',
  styleUrls: ['./modal-list-users.component.scss', '../../helper-role.scss']
})
export class ModalListUsersComponent implements OnInit {
  isLoading = false;
  roleId = '';
  keyword = '';
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  listUsers = [];
  @Input() dataModal: any;
  dataFromParent: any;

  constructor(
    public activeModal: NgbActiveModal,
    private roleService: RoleService,
    private showMessage: ShowMessageService,
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.roleService
      .getListUserRole(this.dataFromParent.roleId, this.keyword, this.pageSize, this.pageIndex)
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.listUsers = res.data.data;
            this.collectionSize = res.data?.totalItems;
          } else {
            this.showMessage.error(res.msg);
          }
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
        }
      );
  }

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.pageIndex = 1;
      this.keyword = value;
      this.getList();
    }
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
