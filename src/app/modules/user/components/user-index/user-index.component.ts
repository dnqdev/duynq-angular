import { ModalChangePasswordComponent } from './../../modals/modal-change-password/modal-change-password.component';
import { translate } from '@ngneat/transloco';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION, MESSAGE_ERROR_CALL_API, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserList } from 'src/app/_models/user/user.model';
import { UserService } from 'src/app/_services/user/user.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {
  permission = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = 1;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;

  valueDefaultIsActive: string = '';
  valueDefaultSchool: string = '';

  dataSource: UserList[] = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
      fullname: 'Thành Long',
      code: 'LongThanh',
      username: 'thanhlong',
      gender: 3,
      email: 'thanhlong@gmail.com',
      phone: '099999999',
      birthday: 1659586974,
      isActive: 1,
      isLogin: 0,
      isChangePassword: 0,
      roles: [
        {
          roleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          roleCode: 'admin',
          roleName: 'admin',
          unitCode: 'unitcode',
          unitName: 'unit name',
          layout: 'core-tenant'
        }
      ]
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
      fullname: 'Thành Long',
      code: 'LongThanh',
      username: 'thanhlong',
      gender: 2,
      email: 'thanhlong@gmail.com',
      phone: '099999999',
      birthday: 1659586974,
      isActive: 1,
      isLogin: 0,
      isChangePassword: 0,
      roles: [
        {
          roleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          roleCode: 'admin',
          roleName: 'admin',
          unitCode: 'unitcode',
          unitName: 'unit name',
          layout: 'core-tenant'
        }
      ]
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
      fullname: 'Thành Long',
      code: 'LongThanh',
      username: 'thanhlong',
      gender: 1,
      email: 'thanhlong@gmail.com',
      phone: '099999999',
      birthday: 1659586974,
      isActive: 0,
      isLogin: 1,
      isChangePassword: 1,
      roles: [
        {
          roleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          roleCode: 'admin',
          roleName: 'admin',
          unitCode: 'unitcode',
          unitName: 'unit name',
          layout: 'core-tenant'
        }
      ]
    }
  ];

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    // this.getDataUser();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onChangeSchool() {
    this.getDataUser();
  }

  onChangeStatus() {
    this.getDataUser();
  }

  onClickSearch(valueSearch) {
    this.keyWord = valueSearch;
    this.getDataUser();
  }

  onEventKeyupEnter(valueSearch) {
    this.keyWord = valueSearch;
    this.getDataUser();
  }

  getDataUser() {
    this.isLoading = true;

    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.userService.getUserList(this.valueDefaultSchool, Number(this.valueDefaultIsActive), this.keyWord).subscribe((res: any) => {
      if (res.status === 1) {
        this.collectionSize = res.data.totalItems;
        this.dataSource = res.data;
        this.isLoading = false;
      }

      if (res.status === 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  openModalChangePassword(item) {
    const modalRef = this.modalService.open(ModalChangePasswordComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: translate('user.btnAction.changedPassword'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: item,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataUser();
      }
    }, (reason) => {
      console.log(reason);

    });
  }

  openModalComfirmDelete(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: translate('user.deleteUser'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: { userId: item.id },
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'user',
        apiSubmit: (dataInput: any) => this.userService.deleteUser(dataInput)
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        console.log(123);

      }
    }, (reason) => {
      console.log(reason);

    });
  }

  getGenderName(value: number): string {
    if (value === 1)
      return translate('genderName.male');
    else if (value === 2)
      return translate('genderName.female');
    else
      return translate('genderName.other');
  }

  getStatusName(value: number): string {
    if (value === 1)
      return translate('user.active');
    else
      return translate('user.noActive');
  }

  getLoginName(value: number): string {
    if (value === 1)
      return translate('user.loginTrue');
    else
      return translate('user.loginFalse');
  }

  getPasswordName(value: number): string {
    if (value === 1)
      return translate('user.passwordTrue');
    else
      return translate('user.passwordFalse');
  }
}
