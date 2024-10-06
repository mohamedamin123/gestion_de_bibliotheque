import { Routes } from '@angular/router';
import { LoginComponent } from './connexion/login/login.component';
import { RegisterComponent } from './connexion/register/register.component';
import { VerifyComponent } from './connexion/verify/verify.component';
import { NewPasswordComponent } from './connexion/new-password/new-password.component';
import { ForgotPasswordComponent } from './connexion/forgot-password/forgot-password.component';
import { BloqueComponent } from './connexion/bloque/bloque.component';
import { HomeMemberComponent } from './member/home-member/home-member.component';
import { ProfileMemberComponent } from './member/profile-member/profile-member.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //CONNEXION
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'nouveau_mot_de_passe', component: NewPasswordComponent },
  { path: 'oublier', component: ForgotPasswordComponent },
  { path: 'bloque', component: BloqueComponent },
  //MEMBER
  { path: 'home-member', component: HomeMemberComponent },
  { path: 'profile-member', component: ProfileMemberComponent },




];
