import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { BooklistComponent } from './booklist/booklist.component';
import { CrudComponent } from './crud/crud.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'',redirectTo:"mainpage",pathMatch:"full"},

  {path:"dashboard",component:DashboardComponent},
  {path:"mainpage",component:MainpageComponent},
  {path:"bookdetail",component:BookdetailComponent},
  {path:"booklist",component:BooklistComponent},
  {path:"crud",component:CrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
