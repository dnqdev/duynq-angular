import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { TestService } from 'src/app/_services/test/test.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  @Input() dataModal: any;

  constructor(
    public activeModal: NgbActiveModal,
    private testService: TestService,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit(): void {
    console.log(this.dataModal);
  }

  closeModal(sendData: any) {
    if(sendData === 'accept') {
      this.testService.delete(this.dataModal.dataFromParent.id).subscribe(res => {
        if(res['status'] ===1) {
          this.activeModal.close(true);
        } else {
          this.showMessageService.error('Đã có lỗi xảy ra');
        }
        this.activeModal.close(sendData);
      })
    }

    if(sendData === 'cancel') {
      this.activeModal.close(sendData);
    }
  }
}
