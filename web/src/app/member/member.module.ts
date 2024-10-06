import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { HomeMemberModule } from './home-member/home-member.module';
import { ProfileMemberModule } from './profile-member/profile-member.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    HomeMemberModule,
    ProfileMemberModule,
  ]
})
export class MemberModule { }
