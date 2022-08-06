import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { RoleService } from 'src/app/_services/role/role.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { LAYOUTS, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-assign-permission-role',
  templateUrl: './modal-assign-permission-role.component.html',
  styleUrls: ['./modal-assign-permission-role.component.scss', '../../helper-role.scss']
})
export class ModalAssignPermissionRoleComponent implements OnInit {

  @Input() dataModal: any;
  formRole: FormGroup;
  dataFromParent: any;
  isLoading = false;
  roleId = '';
  keyword = '';
  infoRole = null;
  listPermissionRole = [];
  listAllPermission = [];
  listAllPermissionOriginal = [];
  listAllPermissionSearch = [];

  constructor(
    private roleService: RoleService,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.getAllPermission();
  }

  getAllPermission() {
    this.isLoading = true;
    this.roleService.getAllPermission(this.keyword).subscribe(
      (res: any) => {
        if (res.status == 1) {
          let arr = res.data.filter(item => item.permissions.length > 0);
          this.listAllPermission = arr;
          this.listAllPermissionOriginal = arr;
          this.customData(this.listAllPermission);
          this.getListPermissionRole();
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

  getListPermissionRole() {
    this.isLoading = true;
    this.roleService.getListPermissionRole(this.dataFromParent?.roleId, this.keyword).subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.listPermissionRole = res.data;
          this.mapPermission(this.listAllPermission, this.listPermissionRole);
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

  submit() {
    this.isLoading = true;
    let arrPermissionSubmit = [];
    this.listAllPermission.forEach(item => {
      let arrPermission = item.permissions.filter(el => el.isChecked).map(el => el.code);
      if(arrPermission?.length > 0) {
        arrPermissionSubmit.push({
          moduleId: item.id,
          permissionCodes: arrPermission
        })
      }
    })
    this.listenFireBase('update-permission', 'role');
    this.roleService.updatePermissionRole({roleId: this.dataFromParent?.roleId, modulePermissions: arrPermissionSubmit}).subscribe(
      (res: any) => {
        if (res.status == 0) {
          this.showMessage.error(res.msg);
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  checkedAll(index) {
    let isCheckedModule = this.listAllPermission[index].isChecked;
    this.listAllPermission[index].permissions.forEach(element => {
      element.isChecked = isCheckedModule;
    });
  }

  isCheckCheckedAll(itemParent: any, indexParent: number, arrParent = []) {
    if(itemParent.permissions.length > 0) {
      let isCheckAll = itemParent.permissions.every((el: any) => el.isChecked);
      if(isCheckAll) arrParent[indexParent].isChecked = true;
      else arrParent[indexParent].isChecked = false;
    } else arrParent[indexParent].isChecked = false;
  }

  mapNameLayout() {
    return LAYOUTS.find(layout => layout.code == this.infoRole?.layout)?.name || '--';
  }

  // map data permission in role - permission in list all
  checkPermission(value = '', parentId = '',  arr = []) {
    // find module
    let item = arr.find((el: any) => el.id == parentId);
    if(!item) return false;
    // find permission
    return item.permissions.findIndex((el: any) => el.id == value) != -1 ? true : false;
  }

  mapPermission(arrAll = [], arrMap = []) {
    arrAll.forEach((item, i) => {
      item.permissions.forEach(el => el.isChecked = this.checkPermission(el.id, item.id, arrMap))
      this.isCheckCheckedAll(item, i, arrAll);
    });
  }

  customData(arr=[]) {
    arr.forEach(element => {
      element['isChecked'] = false;
      element.permissions.forEach(item => {
        item['isChecked'] = false;
      });
    });
    return arr;
  }
  // end map data

  search(event, value: string) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.keyword = value.trim();
      // this.getAllPermission();

      if(this.keyword == '') {
        this.listAllPermission = this.listAllPermissionOriginal;
        this.mapPermission(this.listAllPermission, this.listPermissionRole);
        return;
      }
      let arr = [...this.listAllPermission];
      this.listAllPermission = [];
      this.isLoading = true;
      this.listAllPermissionOriginal.forEach((item) => {
        let arr = item.permissions.filter(
          (per) =>
            per.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
            per.code.toLowerCase().includes(this.keyword.toLowerCase())
        );
        if (arr.length > 0)
          this.listAllPermissionSearch.push(item.id);
      });
      arr.forEach(element => {
        let index = this.listAllPermissionSearch.findIndex(item => item == element.id);
        if(index != -1) this.listAllPermission.push(element);
      });
      this.isLoading = false;
    }
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
