import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientModule } from './client/client.module';
import { ConnexionModule } from './connexion/connexion.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes), 

    ClientModule,
    ConnexionModule,
    AdminModule
  ]
})
export class AppModule { }
