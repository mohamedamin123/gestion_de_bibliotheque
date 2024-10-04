import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { HomeMemberModule } from './home-member/home-member.module';
import { ProfileMemberModule } from './profile-member/profile-member.module';
import { ConsulterMemberModule } from './consulter-member/consulter-member.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MemberRoutingModule,
    HomeMemberModule,
    ProfileMemberModule,
    ConsulterMemberModule
  ]
})
export class MemberModule { }
