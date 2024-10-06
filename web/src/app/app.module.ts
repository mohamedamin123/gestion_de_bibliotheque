import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionModule } from './connexion/connexion.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MemberModule } from './member/member.module';
import { AutherModule } from './auther/auther.module';
import { BibliothecaireModule } from './bibliothecaire/bibliothecaire.module'; // Import provideHttpClient
import { RoundPipe } from './round.pipe';

@NgModule({
  declarations: [
     // Add the pipe here

  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ConnexionModule,
    SharedModule,
    HttpClientModule,
    MemberModule,
    AutherModule,
    BibliothecaireModule,
    RoundPipe

  ],
  providers: [
    provideHttpClient(
      withFetch() // Enable fetch API for HttpClient
    )
  ]
})
export class AppModule { }


