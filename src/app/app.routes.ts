import { Routes } from '@angular/router';
import path from 'node:path';
import { EmpCrudComponent } from './emp-crud/emp-crud.component';

export const routes: Routes = [
    {path:'emp-crud', component:EmpCrudComponent}
];
