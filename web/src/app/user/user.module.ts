import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AutherModule } from './auther/auther.module';
import { MemberModule } from './member/member.module';
import { BibliothecaireModule } from './bibliothecaire/bibliothecaire.module';
import { HomeBibliothecaireModule } from './bibliothecaire/home-bibliothecaire/home-bibliothecaire.module';
import { ListeMemberModule } from './bibliothecaire/liste-member/liste-member.module';
import { ListeLivreModule } from './bibliothecaire/liste-livre/liste-livre.module';
import { ListeAutherModule } from './bibliothecaire/liste-auther/liste-auther.module';
import { ConsulterUserModule } from './bibliothecaire/consulter-user/consulter-user.module';
import { HomeAutherModule } from './auther/home-auther/home-auther.module';
import { AjouterLivreModule } from './auther/ajouter-livre/ajouter-livre.module';
import { AccepterLivreModule } from './bibliothecaire/accepter-livre/accepter-livre.module';
import { AdminModule } from './admin/admin.module';
import { ListeBibliothecaireModule } from './admin/liste-bibliothecaire-/liste-bibliothecaire-.module';
import { HomeAdminModule } from './admin/home-admin/home-admin.module';
import { ListeReservationModule } from './bibliothecaire/liste-reservation/liste-reservation.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    AutherModule,
    MemberModule,
    BibliothecaireModule,
    HomeBibliothecaireModule,
    ListeMemberModule,
    ListeLivreModule,
    ListeAutherModule,
    ConsulterUserModule,
    HomeAdminModule,
    HomeAutherModule,
    AjouterLivreModule,
    AccepterLivreModule,
    AdminModule,
    ListeBibliothecaireModule,
    ListeReservationModule
  ]
})
export class UserModule { }
