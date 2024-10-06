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
    ConsulterUserModule
  ]
})
export class UserModule { }
