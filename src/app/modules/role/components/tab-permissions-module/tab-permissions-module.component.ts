import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAssignPermissionRoleComponent } from './../../modals/modal-assign-permission-role/modal-assign-permission-role.component';
import { Component, Input, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { RoleService } from 'src/app/_services/role/role.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-tab-permissions-module',
  templateUrl: './tab-permissions-module.component.html',
  styleUrls: ['./tab-permissions-module.component.scss', '../../helper-role.scss']
})
export class TabPermissionsModuleComponent implements OnInit {
  isLoading = false;
  @Input() roleId = '';
  keyword = '';
  listPermissionOriginal = [];
  listPermission = [];
  permission = DATA_PERMISSION;

  constructor(
    private roleService: RoleService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getListPermissionRole();
  }

  getListPermissionRole() {
    this.isLoading = true;
    this.roleService.getListPermissionRole(this.roleId, this.keyword).subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.listPermissionOriginal = res.data;
          this.listPermission = res.data;
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

  assignPermission() {
    const modalRef = this.modalService.open(ModalAssignPermissionRoleComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      // backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-xxl',
    });

    let data = {
      titleModal: 'role.addPermission',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent:  {
        roleId: this.roleId,
        service: this.roleService,
        apiGetList: (id, keyword) => this.roleService.getListPermissionRole(id, keyword),
        apiSubmit: (dataInput: any) =>
          this.roleService.updatePermissionRole(dataInput),
        keyFirebaseAction: 'update-permission',
        keyFirebaseModule: 'role',
        nameForm: 'create'
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if(result) this.getListPermissionRole();
      },
      (reason) => {}
    );
  }

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.keyword = value.trim();
      this.listPermission = [];
      // this.getListPermissionRole();
      this.isLoading = true;
      this.listPermissionOriginal.forEach((item) => {
        let arr = item.permissions.filter(
          (per) =>
            per.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
            per.code.toLowerCase().includes(this.keyword.toLowerCase())
        );
        if (arr.length > 0)
          this.listPermission.push({
            id: item.id,
            code: item.code,
            name: item.name,
            indexOrder: item.indexOrder,
            permissions: arr,
          });
      });
      this.isLoading = false;
    }
  }

}
