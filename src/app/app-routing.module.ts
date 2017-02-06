import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InsuranceDashboardComponent } from './insurance/components/index';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', pathMatch: 'full', component: InsuranceDashboardComponent },
  { path: 'dashboard/:live', pathMatch: 'full', component: InsuranceDashboardComponent },
  { path: 'dashboard/:live/:exe_id', pathMatch: 'full', component: InsuranceDashboardComponent }
];



export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}