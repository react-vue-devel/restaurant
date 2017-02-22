import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { RegisterPage } from '../pages/register/register';
import { CloudService } from '../providers/cloud-service';
import { ConfigService } from '../providers/config-service';
import { OrdersAdminPage } from '../pages/orders-admin/orders-admin';
import { CategoryPage } from '../pages/category/category';
import { ImageService } from '../providers/image-service';
import { ItemPage } from '../pages/item/item';
import { AddItemModal } from '../pages/addItemModal/modal-content';


import { AddCategoryModal } from '../pages/addCategoryModal/modal-content';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    LoginPage,
    RegisterPage,
    UserPage,
    OrdersAdminPage,
    AddCategoryModal,
    CategoryPage,
    ItemPage,
    AddItemModal
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
    UserPage,
    OrdersAdminPage,
    AddCategoryModal,
    CategoryPage,
    ItemPage,
    AddItemModal
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CloudService,
    ConfigService,
    ImageService
  ]
})

export class AppModule {}
