import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {Ng2GoogleChartModule} from 'ng2-googlechart';
import { APP_BASE_HREF } from '@angular/common';
import { InsuranceModule } from './insurance/insurance.module';
import { AppComponent }         from './app.component';
import { EmitterService }          from './emitter.service';
import { AppRoutingModule }     from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
     HttpModule,
    JsonpModule,
    Ng2GoogleChartModule,
    AppRoutingModule,
    InsuranceModule   
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    EmitterService,{provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

