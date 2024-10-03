import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionModule } from './connexion/connexion.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ConnexionModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
  ]
})
export class AppModule { }
