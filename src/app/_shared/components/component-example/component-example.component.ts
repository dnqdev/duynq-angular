import { ModalDeleteComponent } from './../../modals/modal-delete/modal-delete.component';
import { ModalTestComponent } from './../../modals/modal-test/modal-test.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/_services/role/role.service';

@Component({
  selector: 'app-component-example',
  templateUrl: './component-example.component.html',
  styleUrls: ['./component-example.component.scss']
})
export class ComponentExampleComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {

  }

  openModalTest() {
    const modalRef = this.modalService.open(ModalTestComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        // backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'sm', // 'sm' | 'md' | 'lg' | 'xl',
        modalDialogClass: 'modal-xxl', // custom class, nếu muốn mở rộng size modal- thêm class modal-xxl | modal-xxxl | modal-full-screen
      });

    let data = {
      titleModal: 'Modal thêm',
      btnCancel: 'Hủy',
      btnAccept: 'Thêm',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: 'Nội dung modal',
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  confirm(id: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        // backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        modalDialogClass: 'modal-md-plus',
      });

    let data = {
      titleModal: 'Xóa',
      btnCancel: 'Hủy',
      btnAccept: 'Xóa',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: {
        id: id,
        service: this.roleService,
        apiSubmit: (dataInput: any) =>
          this.roleService.detailRole(dataInput),
        keyFirebaseAction: '',
        keyFirebaseModule: '',
      },
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }
}
