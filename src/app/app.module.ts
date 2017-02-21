import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {OrdersAdminPage} from '../pages/orders-admin/orders-admin';

import { CloudService } from '../providers/cloud-service';
import { ConfigService } from '../providers/config-service';



@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    RegisterPage,
    OrdersAdminPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    RegisterPage,
    OrdersAdminPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CloudService,
    ConfigService
  ]
})
export class AppModule {}
