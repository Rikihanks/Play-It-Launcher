import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalParentComponent } from '../modal-parent/modal-parent.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends ModalParentComponent implements OnInit {

  email; password;
  invalidFields: boolean;
  wrongPassword: boolean;

  constructor(public auth: AuthService, private loader: LoaderService) {
    super();
  }

  ngOnInit(): void {
  }

  login() {

    this.clearErrors();

    this.validateFields();

    if(this.invalidFields) {
      return;
    }

    this.loader.startLoader();

    this.auth.loginUser(this.email, this.password)
    .then(() => {super.getSelfReference("loginModal").hide();})
    .catch(err => {
      var errorCode = err.code;
      if(errorCode == "auth/wrong-password" || errorCode == "auth/invalid-email") {
        this.wrongPassword = true;
      }
    })
    .finally(() =>{
      this.loader.stopLoader()
    });

  }

  validateFields() {
    let fields = [this.email, this.password]
    fields.forEach(field => {if(field == null || field == '') this.invalidFields = true})
  }

  clearErrors() {
    this.invalidFields = false;
    this.wrongPassword = false;
  }
}
