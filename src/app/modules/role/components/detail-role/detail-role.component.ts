import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/_services/role/role.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION, LAYOUTS } from 'src/app/_shared/utils/constant';
import { ModalFormRoleComponent } from '../../modals/modal-form-role/modal-form-role.component';
@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.scss', '../../helper-role.scss'],
})
export class DetailRoleComponent implements OnInit {
  isLoading = false;
  roleId = '';
  keyword = '';
  infoRole = null;
  tabActive = 1;
  permission = DATA_PERMISSION;

  constructor(
    private modalService: NgbModal,
    private roleService: RoleService,
    private showMessage: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.roleId = params.id;
      this.getDetail();
    });
    this.tabActive = Number(this.activatedRoute.snapshot.queryParams.tab);
  }

  getDetail() {
    this.isLoading = true;
    this.roleService.detailRole(this.roleId).subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.infoRole = res.data;
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

  update() {
    const modalRef = this.modalService.open(ModalFormRoleComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'role.titleDialogUpdateRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        role: this.infoRole,
        service: this.roleService,
        apiSubmit: (dataInput: any) => this.roleService.updateRole(dataInput),
        keyFirebaseAction: 'update',
        keyFirebaseModule: 'role',
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) this.getDetail();
      },
      (reason) => {}
    );
  }

  mapNameLayout() {
    return (
      LAYOUTS.find((layout) => layout.code == this.infoRole?.layout)?.name ||
      '--'
    );
  }

  changeTab(indexTab: number) {
    this.tabActive = indexTab + 1;
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {tab: this.tabActive},
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
}
