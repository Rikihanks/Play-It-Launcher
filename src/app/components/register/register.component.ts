import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalParentComponent } from '../modal-parent/modal-parent.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent extends ModalParentComponent implements OnInit {

  invalidFields = false;
  emailAlredyRegistered = false;
  userName; email; password; avatarUrl;

  imgs = ["https://i.ibb.co/b7NCfkD/001-scientist.png",
  "https://i.ibb.co/PcGsC4h/002-werewolf.png",
  "https://i.ibb.co/89PqHVW/003-pumpkin.png",
  "https://i.ibb.co/T8JgvxK/004-nurse.png",
  "https://i.ibb.co/M1DZSf1/005-magician.png",
  "https://i.ibb.co/8dKpysh/006-unicorn.png",
  "https://i.ibb.co/xgrV1Qv/007-wrestler.png",
  "https://i.ibb.co/SdFrH4r/008-gnome.png",
  "https://i.ibb.co/kyB3dw7/009-cowboy.png",
  "https://i.ibb.co/yV4tqtv/010-clown.png",
  "https://i.ibb.co/fkpXbR4/011-scarecrow.png",
  "https://i.ibb.co/sqRW5Ht/012-fairy.png",
  "https://i.ibb.co/NjDMkDk/013-astronaut.png",
  "https://i.ibb.co/rb6wv6t/014-glasses.png",
  "https://i.ibb.co/Pm0yf3q/015-prisioner.png",
  "https://i.ibb.co/xJgV3Jm/016-viking.png"
  /*https://i.ibb.co/z5nv43W/017-nun.png
  https://i.ibb.co/hDGWjTq/018-mummy.png
  https://i.ibb.co/y6WZNCp/019-knight.png
  https://i.ibb.co/qpNWrhb/020-harlequin.png
  https://i.ibb.co/JRWM8kT/021-princess.png
  https://i.ibb.co/qMpn1DN/022-indian-woman.png
  https://i.ibb.co/K9gkw8X/023-pirate.png
  https://i.ibb.co/HFM2vqC/024-zombie.png
  https://i.ibb.co/7tkwNVb/025-skeleton.png
  https://i.ibb.co/v4SV0CS/026-cat.png
  https://i.ibb.co/3YmyVJY/027-wizard.png
  https://i.ibb.co/tq3YjFj/028-ghost.png
  https://i.ibb.co/wWMVBXw/029-firefighter.png
  https://i.ibb.co/yPpbvQS/030-troglodyte.png
  https://i.ibb.co/mDCR1TC/031-rat.png
  https://i.ibb.co/HG4ygJY/032-catrina.png
  https://i.ibb.co/Yjm39B1/033-monster.png
  https://i.ibb.co/PGSRD7c/034-ghost.png
  https://i.ibb.co/pbjgGgQ/035-witch.png
  https://i.ibb.co/W6CTmjn/036-serial-killer.png
  https://i.ibb.co/0mNdW4z/037-alien.png
  https://i.ibb.co/G7N6KDP/038-doll.png
  https://i.ibb.co/x53fPC4/039-devil.png
  https://i.ibb.co/FHbDLrh/040-frankestein.png
  https://i.ibb.co/H2qHGZq/041-bride.png
  https://i.ibb.co/5xBg5BZ/042-ninja.png
  https://i.ibb.co/ZBBmhjK/043-vampire.png
  https://i.ibb.co/SXR4FGf/044-thief.png
  https://i.ibb.co/0B2CTVV/045-angel.png
  https://i.ibb.co/LSyQw1Y/046-mime.png
  https://i.ibb.co/GdStNr8/047-little-red-riding-hood.png
  https://i.ibb.co/DgLt00C/048-robot.png
  https://i.ibb.co/mSPWJQS/049-superheroine.png
  https://i.ibb.co/jhvrSFd/050-police.png*/
  ]

  constructor(public auth: AuthService, 
              private loader: LoaderService,) {
    super();
  }

  ngOnInit(): void {
  }

  register() {

    this.validateForm();

    if(this.invalidFields) {
      return;
    }
    
    this.loader.startLoader();

    this.auth.registerUser(this.email, this.password).then((user) => {
      this.auth.updateUserData(user, this.userName, this.avatarUrl);
      super.getSelfReference("registerModal").hide();
    })
    .catch((error) => {
      var errorCode = error.code;
      if(errorCode == "auth/email-already-in-use") {
        this.emailAlredyRegistered = true;
      }
    })
    .finally(() => {
      this.loader.stopLoader();
      this.clearFields();
    });
    
  }

  private validateForm() {
    this.resetErrors();

    let fields = [this.avatarUrl, this.email, this.password, this.userName];
    fields.forEach(field => {
      if (field == null || field == undefined || field == "")
        this.invalidFields = true;
    });
  }

  cancel() {

    this.clearFields();
    super.getSelfReference("registerModal").hide();
  }

  clearFields() {
    this.userName = null;
    this.password = null;
    this.avatarUrl = null;
    this.email = null;
    this.resetErrors();
  }

  resetErrors() {
    this.invalidFields = false;
    this.emailAlredyRegistered = false;
  }

}
