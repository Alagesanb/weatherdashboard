import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../app/search/search.component'
import { NavComponent } from '../app/nav/nav.component'

const routes: Routes = [
//   {
//     path: 'nav',
//     component: NavComponent
// },
{
    path: 'search',
    component: SearchComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
