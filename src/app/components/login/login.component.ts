import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  email; password;
  invalidFields: boolean;
  wrongPassword: boolean;

  constructor(public auth: AuthService, private loader: LoaderService) { }

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
    .then(() => {this.getSelfReference().hide();})
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

  getSelfReference(): any {
    let modalref = document.getElementById('loginModal') as any;
    //@ts-ignore
    let modal = bootstrap.Modal.getInstance(modalref)
    return modal;
  }

  clearErrors() {
    this.invalidFields = false;
    this.wrongPassword = false;
  }
}
