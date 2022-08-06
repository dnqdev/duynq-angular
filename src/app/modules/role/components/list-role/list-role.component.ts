import { Role } from './../../../../_models/role/role.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/_services/role/role.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  DATA_PERMISSION,
  LAYOUTS,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT
} from 'src/app/_shared/utils/constant';
import { ModalFormRoleComponent } from '../../modals/modal-form-role/modal-form-role.component';
import { ModalListUsersComponent } from '../../modals/modal-list-users/modal-list-users.component';
import { translate } from "@ngneat/transloco";
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss', '../../helper-role.scss'],
})
export class ListRoleComponent implements OnInit {
  layoutCode = null;
  keyword = '';
  arrRole: Array<Role> = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  arrLayouts = LAYOUTS;
  isLoading = false;
  permission = DATA_PERMISSION;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private roleService: RoleService,
    private showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    // this.getList();
  }

  getList() {
    this.isLoading = true;
    this.roleService
      .getList(this.keyword, this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.arrRole = res.data.data;
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
    const modalRef = this.modalService.open(ModalFormRoleComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      // backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'role.titleDialogAddRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        service: this.roleService,
        apiSubmit: (dataInput: any) =>
          this.roleService.createRole(dataInput),
        keyFirebaseAction: 'create',
        keyFirebaseModule: 'role',
        nameForm: 'create'
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) this.getList()
      },
      (reason) => { }
    );
  }

  updateRole(role: any) {
    const modalRef = this.modalService.open(ModalFormRoleComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      // backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'role.titleDialogUpdateRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        role: role,
        service: this.roleService,
        apiSubmit: (dataInput: any) =>
          this.roleService.updateRole(dataInput),
        keyFirebaseAction: 'update',
        keyFirebaseModule: 'role',
        nameForm: 'update'
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) this.getList()
      },
      (reason) => { }
    );
  }

  viewList(role) {
    this.router.navigate([`role/${role}/user`]);
  }

  delete(roleId) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'role.titleDialogDeleteRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        role: roleId,
        dataInput: { id: roleId },
        service: this.roleService,
        apiSubmit: (dataInput: any) =>
          this.roleService.deleteRole(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'role',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) this.getList()
      },
      (reason) => { }
    );
  }

  viewModalListUser(roleId) {
    const modalRef = this.modalService.open(ModalListUsersComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg',
    });

    let data = {
      titleModal: 'role.listUser',
      btnAccept: 'btnAction.close',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        roleId: roleId,
        dataInput: {id: roleId},
        service: this.roleService,
        apiSubmit: (dataInput: any) =>
          this.roleService.deleteRole(dataInput),
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if(result) this.getList()
      },
      (reason) => {}
    );
  }

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.pageIndex = 1;
      this.keyword = value.trim();
      this.getList();
    }
  }

  filter() {
    this.getList();
  }

  mapNameLayout(layoutCode: string) {
    return LAYOUTS.find(layout => layout.code == layoutCode)?.name || '--';
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }
}
