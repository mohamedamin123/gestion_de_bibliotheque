import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule
  ],
})
export class SharedModule { }


