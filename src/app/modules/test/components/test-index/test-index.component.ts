import { ModalFormComponent } from './../../modals/modal-form/modal-form.component';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestService } from 'src/app/_services/test/test.service';
import { ModalDeleteComponent } from '../../modals/modal-delete/modal-delete.component';

@Component({
  selector: 'app-test-index',
  templateUrl: './test-index.component.html',
  styleUrls: ['./test-index.component.scss']
})
export class TestIndexComponent implements OnInit {
  // collectionSize: number = 11;
  pageIndex: number = 1;
  classId: number;
  isLoading: boolean = false;
  dataSource: any[];
  classList: any[];

  constructor(
    private testService: TestService,
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,

  ) { }

  ngOnInit(): void {
    this.getClassList();
  }

  // paginationChange(event: any) {
  //   this.pageIndex = event.pageIndex;
  //   this.pageSize = event.pageSize;
  // }

  index() {
    this.isLoading = true;
    this.testService.index(this.pageIndex, this.classId).subscribe((res: any) => {
      this.dataSource = res.data;
      console.log(this.dataSource);

      this.isLoading = false;

    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  changeClass(event) {
    this.classId = event.target.value;
    this.index();
  }

  getNameClass(value: number) {
    let className = '';
    this.classList.forEach(element => {
      if(element.id == value) {
        className = element.fullname;
      }
    });

    return  className;
  }

  openModalAdd() {
    const modalRef = this.modalService.open(ModalFormComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: 'Thêm mới học sinh',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: null,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.index();
      }
    }, (reason) => {
      console.log(reason);

    });
  }

  openModalUpdate(item) {
    const modalRef = this.modalService.open(ModalFormComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg'
      });

    let data = {
      titleModal: 'Cập nhật học sinh',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: false,
      dataFromParent: item
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.index();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openModalDelete(item, className) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: 'Xóa học sinh',
      btnCancel: 'Hủy',
      btnAccept: 'Xác nhận',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: item,
      className: className
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if(result === true) {
        this.index();
      }

    }, (reason) => {
      console.log(reason);

    });
  }

  getClassList() {
    this.isLoading = true;
    this.testService.getClassList().subscribe((res: any) => {
      if (res.status === 1) {
        this.classList = res.data;
        this.classId = this.classList[0].id;
        this.index();
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


}
