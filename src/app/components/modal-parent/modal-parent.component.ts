import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-parent',
  template: '',
})
export class ModalParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  public getSelfReference(id: string): any {
    let modalref = document.getElementById(id) as any;
    //@ts-ignore
    let modal = bootstrap.Modal.getInstance(modalref)
    return modal;
  }

}
