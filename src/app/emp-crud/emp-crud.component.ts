import { ApplicationModule, Component, OnInit } from '@angular/core';

import data from '../../data/employee.json'
import { CommonModule } from '@angular/common';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';


interface Employee{
  id:number;
  name:string;
  email:string;
  gender:string;
}

@Component({
  selector: 'app-emp-crud',
  imports: [
    CommonModule,
    ApplicationModule,
    NgbModule,
    FormsModule
  ],
  templateUrl: './emp-crud.component.html',
  styleUrl: './emp-crud.component.css'
})
export class EmpCrudComponent implements OnInit
{
  users: Employee[] = [];
  name: any
  email: any;
  gender: any;
  selectedUser: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.users = data
  }

  deleteUser(selectedUserId: any) {
    debugger
    const index = this.users.findIndex(x => x.id == selectedUserId)
    this.users.splice(index, 1)
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
  }

  close(closeModal: any) {
    this.setAllValues();
    closeModal.dismiss('Cross click');
  }

  setAllValues() {
    this.email = ""
    this.name = ""
    this.gender = ""
    this.selectedUser = null
  }

  addStudent(values: any) {
    const size = this.users?.length - 1
    values.id = this.users[size]?.id + 1
    this.users.push(values);
    this.setAllValues();
  }

  editUser(selectedUser: any, content: any) {
    this.selectedUser = selectedUser
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.email = selectedUser?.email
    this.name = selectedUser?.name
    this.gender = selectedUser?.gender
  }

  updateStudentInTable(values: any) {
    this.users.forEach(x => {
      if (x.id == this.selectedUser.id) {
        x.name = values.name
        x.email = values.email
        x.gender = values.gender
      }
    });
    this.setAllValues();
  }

  onSubmit(f: NgForm) {
    const formValues = f?.value;
    if (this.selectedUser) {
      this.updateStudentInTable(formValues)
    }
    else {
      this.addStudent(formValues)
    }
    this.modalService.dismissAll(); //dismiss the modal
  }
}
