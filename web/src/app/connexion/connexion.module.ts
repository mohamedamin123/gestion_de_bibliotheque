import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnexionRoutingModule } from './connexion-routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { VerifyModule } from './verify/verify.module';
import { NewPasswordModule } from './new-password/new-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConnexionRoutingModule,
    LoginModule,
    RegisterModule,
    VerifyModule,
    NewPasswordModule,
    ForgotPasswordModule
  ]
})
export class ConnexionModule { }
