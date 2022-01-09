import { NgModule } from '@angular/core';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
