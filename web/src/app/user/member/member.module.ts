import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { HomeMemberModule } from './home-member/home-member.module';
import { ProfileMemberModule } from '../profile-member/profile-member.module';
import { ReservationModalComponent } from './home-member/ReservationModal/reservation-modal.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    HomeMemberModule,
    ProfileMemberModule,
    ReservationModalComponent
  ]
})
export class MemberModule { }
