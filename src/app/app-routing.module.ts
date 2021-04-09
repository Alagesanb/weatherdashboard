import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../app/search/search.component'
import { SearchinfoComponent } from '../app/searchinfo/searchinfo.component';
import { InfoComponent} from '../app/info/info.component';
 
const routes: Routes = [
{
    path: 'search',
    component: SearchComponent
},
{
  path: 'searchinfo',
  component: SearchinfoComponent
},
{
path: 'info',
component: InfoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
