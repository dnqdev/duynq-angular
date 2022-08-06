import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from 'src/app/_models/role/role.model';
import { RoleService } from 'src/app/_services/role/role.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { DATA_PERMISSION, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, STATUS_USERS } from 'src/app/_shared/utils/constant';
import { PAGE_INDEX_DEFAULT } from '../../../../_shared/utils/constant';
import { ModalAddUserToRoleComponent } from '../../modals/modal-add-user-to-role/modal-add-user-to-role.component';

@Component({
  selector: 'app-tab-user-role',
  templateUrl: './tab-user-role.component.html',
  styleUrls: ['./tab-user-role.component.scss', '../../helper-role.scss']
})
export class TabUserRoleComponent implements OnInit {

  isLoading = false;
  @Input() roleId = '';
  keyword = '';
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  listUsers: Array<UserRole> = [];
  permission = DATA_PERMISSION;

  constructor(
    private roleService: RoleService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.roleService
      .getListUserRole(this.roleId, this.keyword, this.pageSize, this.pageIndex)
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

  create() {
    const modalRef = this.modalService.open(ModalAddUserToRoleComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      // backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'role.addUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent:  {
        roleId: this.roleId,
        service: this.roleService,
        apiGetList: (dataInput, pageSize, pageIndex) => this.roleService.getListUserToAssignRole(dataInput, pageSize, pageIndex),
        apiSubmit: (dataInput: any) =>
          this.roleService.assignUserRole(dataInput),
        keyFirebaseAction: 'assign-user',
        keyFirebaseModule: 'role',
        nameForm: 'create'
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if(result) this.getList();
      },
      (reason) => {}
    );
  }

  remove(userId) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      // backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'role.removeUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.remove',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        role: userId,
        dataInput:  {roleId: this.roleId, userId: userId},
        service: this.roleService,
        apiSubmit: (dataInput: any) =>
          this.roleService.removeUserRole(dataInput),
        keyFirebaseAction: 'remove-user',
        keyFirebaseModule: 'role',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if(result) this.getList();
      },
      (reason) => {}
    );
  }

  mapNameStatus(value) {
    return STATUS_USERS.find(status => status.value == value)?.label || '--';
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

}
