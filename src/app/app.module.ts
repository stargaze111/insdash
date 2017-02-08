import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {Ng2GoogleChartModule} from 'ng2-googlechart';
import { InsuranceModule } from './insurance/insurance.module';
import { AppComponent }         from './app.component';
import { EmitterService }          from './emitter.service';
import { AppRoutingModule }     from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import {TimeAgoPipe} from 'time-ago-pipe';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
     HttpModule,
    JsonpModule,
    Ng2GoogleChartModule,
    AppRoutingModule,
    InsuranceModule,
    Ng2DatetimePickerModule
  ],
  declarations: [
    AppComponent,TimeAgoPipe
  ],
  exports: [
   TimeAgoPipe
  ],  
  providers: [
    EmitterService,{provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

