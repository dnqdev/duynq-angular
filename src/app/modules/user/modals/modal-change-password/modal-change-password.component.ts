import { UserService } from 'src/app/_services/user/user.service';
import { translate } from '@ngneat/transloco';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserManagerService } from '../../../../_services/user-manager.service';
import { ShowMessageService } from '../../../../_services/show-message.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { MESSAGE_ERROR_CALL_API, REGEX_PASSWORD, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { Subscriber, Observable } from 'rxjs';
@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss']
})
export class ModalChangePasswordComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  formGroup: FormGroup;
  dataSchoolLogo: string;
  validationMessages = {
    password: [
      {
        type: "required",
        message: translate('user.validator.password.required'),
      },
      {
        type: "pattern",
        message: translate('user.validator.password.pattern'),
      },
    ],
    confirmPassword: [
      {
        type: "required",
        message: translate('user.validator.confirmPassword.required'),
      },
      {
        type: "mustMatch",
        message: translate('user.validator.confirmPassword.mustMatch'),
      }

    ]
  };

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group(
      {
        password: ['', [Validators.required, Validators.pattern(REGEX_PASSWORD)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      }
    );
  }

  closeModal(sendData: any) {
    if (sendData == "accept") {
      this.saveFormData();
    } else {
      this.activeModal.close(false);
    }
  }

  saveFormData() {
    this.isLoading = true;
    let dataInput = {
      userId: this.dataModal.dataFromParent.id,
      password: this.formGroup.value.password,
      confirmedPassword: this.formGroup.value.confirmPassword
    }
    this.listenFireBase("change-password", "user");
    this.userService.changePasswordUser(dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string) {
    setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
