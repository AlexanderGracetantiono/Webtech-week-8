import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ShellComponent } from './shell/shell.component';
import { MatakuliahFormComponent } from './matkul-form/matkul-form.component';
import { DosenFormComponent } from './dosen-form/dosen-form.component';
import { DosenListComponent } from './dosen-list/dosen-list.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    // canActivateChild: [LoginGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/main'
      },
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'matkul/:id',
        component: MatakuliahFormComponent
      },
      {
        path: 'matkul',
        component: MatakuliahFormComponent
      },
      {
        path: 'dosen/:id',
        component: DosenFormComponent
      },
      {
        path: 'dosen',
        component: DosenFormComponent
      },
      {
        path: 'dosenList',
        component: DosenListComponent
      },
    ]
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
