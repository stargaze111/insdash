import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {Ng2GoogleChartModule} from 'ng2-googlechart';
import * as _ from "underscore";
import { InsuranceDashboardComponent } from './components/index';


import { SearchInsuranceTransactionsService } from './services/transactions.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
     HttpModule,
    JsonpModule,
    Ng2GoogleChartModule
  ],
  declarations: [    
    InsuranceDashboardComponent
  ],

  providers: [
      SearchInsuranceTransactionsService
  ],

  exports:[    
    InsuranceDashboardComponent
  ]
  
})
export class InsuranceModule {
}

