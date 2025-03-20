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
  employees: Employee[] = [];
  name: any
  email: any;
  gender: any;
  selectedEmp: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.employees = data
  }

  deleteEmp(selectedEmpId: any) {
    debugger
    const index = this.employees.findIndex(x => x.id == selectedEmpId)
    this.employees.splice(index, 1)
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
    this.selectedEmp = null
  }

  addEmployee(values: any) {
    const size = this.employees?.length - 1
    values.id = this.employees[size]?.id + 1
    this.employees.push(values);
    this.setAllValues();
  }

  editEmp(selectedEmp: any, content: any) {
    this.selectedEmp = selectedEmp
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.email = selectedEmp?.email
    this.name = selectedEmp?.name
    this.gender = selectedEmp?.gender
  }

  updateEmployeeInTable(values: any) {
    this.employees.forEach(x => {
      if (x.id == this.selectedEmp.id) {
        x.name = values.name
        x.email = values.email
        x.gender = values.gender
      }
    });
    this.setAllValues();
  }

  onSubmit(f: NgForm) {
    const formValues = f?.value;
    if (this.selectedEmp) {
      this.updateEmployeeInTable(formValues)
    }
    else {
      this.addEmployee(formValues)
    }
    this.modalService.dismissAll(); //dismiss the modal
  }
}
