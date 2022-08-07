import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber, Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ResizeImageService } from 'src/app/_services/resize-image.service';
import { TestService } from 'src/app/_services/test/test.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  @Input() dataModal: any;

  isLoading: boolean = false;
  avatar: string = 'https://robohash.org/repellenduscommodiconsequuntur.png?size=250x250&set=set1';
  formGroup: FormGroup;
  isUpdateForm = false;
  id: number;
  dataInput: any;

  classList: any[];
  valueNam: number = 1;
  valueNu: number = 2;
  genderValue: number = 0;


  // data cần truyền lên
  // currentDate = "1653706178";
  currentDate = "07/08/2022";
  timePicker: boolean = false;

  // lay data khi chon ngày xong
  dataTimeOutput(event: any) {
    this.formGroup.controls["DayOfBirth"].setValue(event);
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private testService: TestService,
    private resizeImageService: ResizeImageService,
  ) { }

  ngOnInit(): void {
    this.getClassList();
  }

  getClassList() {
    this.isLoading = true;
    this.testService.getClassList().subscribe((res: any) => {
      if (res.status === 1) {
        this.classList = res.data;
        this.initForm(this.dataModal.dataFromParent);
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

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  onChangeFileInputAvatar(event): void {
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      })
      dataReadFile.subscribe((data) => {
        this.avatar = data as string;
        this.formGroup.controls["avatar"].setValue(this.avatar);
      })
    }
  }

  initForm(dataForm: any = null) {
    if (dataForm) {
      this.avatar = dataForm.avatar;
      this.isUpdateForm = true;
      this.id = dataForm.id;
      this.genderValue = dataForm.gender;
      this.currentDate = dataForm.DayOfBirth;
      this.formGroup = this.fb.group({
        avatar: [dataForm.Avatar, [
        ]],
        fullName: [`${dataForm.firstName} ${dataForm.lastName}`, [
          Validators.required,
          Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]*$/)
        ]],

        DayOfBirth: [dataForm.DayOfBirth, [

        ]],

        gender: [dataForm.gender, [
        ]],

        classId: [dataForm.classId, [
          Validators.required,
        ]],
      });
    } else {
      this.formGroup = this.fb.group({
        avatar: ['', [
        ]],
        fullName: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]*$/)
        ]],
        DayOfBirth: ['', [

        ]],
        gender: ['', [

        ]],
        classId: ['', [
          Validators.required,
        ]],
      });
    }
  }

  onSubmitformGroup(): void {
    this.dataInput = {
      Avatar: this.formGroup.value.avatar,
      Fullname: this.formGroup.value.fullName,
      DayOfBirth: this.formGroup.value.DayOfBirth,
      Gender: this.formGroup.value.gender,
      ClassId: Number(this.formGroup.value.classId),

    }

    this.isLoading = true;
    if (this.isUpdateForm) {
      this.testService.update(this.id, this.dataInput).subscribe((res: any) => {
        if (res.status == 1) {
          this.isLoading = false;
          this.activeModal.close(true);
        } else {
          this.isLoading = false;
          this.showMessageService.error(res.message);
        }
      }, (_err: any) => {
        this.isLoading = false;
      })
    } else {
      this.testService.store(this.dataInput).subscribe((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.isLoading = false;
          this.activeModal.close(true);
        } else {
          this.isLoading = false;
          this.showMessageService.error(res.message);
        }
      }, (_err: any) => {
        this.isLoading = false;
      })
    }
  }
}
