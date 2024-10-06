import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionModule } from './connexion/connexion.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MemberModule } from './user/member/member.module';
import { AutherModule } from './user/auther/auther.module';
import { BibliothecaireModule } from './user/bibliothecaire/bibliothecaire.module'; // Import provideHttpClient
import { RoundPipe } from './round.pipe';
import { UserModule } from './user/user.module';

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
    RoundPipe,
    UserModule,

  ],
  providers: [
    provideHttpClient(
      withFetch() // Enable fetch API for HttpClient
    )
  ]
})
export class AppModule { }


