import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {Ng2GoogleChartModule} from 'ng2-googlechart';
import { DatepickerModule } from 'angular2-material-datepicker';
import * as _ from "underscore";
import { InsuranceDashboardComponent } from './components/index';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import { SearchInsuranceTransactionsService } from './services/transactions.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
     HttpModule,
    JsonpModule,
    DatepickerModule,
    Ng2GoogleChartModule,
    Ng2DatetimePickerModule
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

