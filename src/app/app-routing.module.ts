import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../app/search/search.component'
import { SearchinfoComponent } from '../app/searchinfo/searchinfo.component';

const routes: Routes = [
{
    path: 'search',
    component: SearchComponent
},
{
  path: 'searchinfo',
  component: SearchinfoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
