import { Routes } from '@angular/router';
import { LoginComponent } from './connexion/login/login.component';
import { RegisterComponent } from './connexion/register/register.component';
import { VerifyComponent } from './connexion/verify/verify.component';
import { NewPasswordComponent } from './connexion/new-password/new-password.component';
import { ForgotPasswordComponent } from './connexion/forgot-password/forgot-password.component';
import { BloqueComponent } from './connexion/bloque/bloque.component';
import { HomeMemberComponent } from './user/member/home-member/home-member.component';
import { ProfileMemberComponent } from './user/profile-member/profile-member.component';
import { HomeBibliothecaireComponent } from './user/bibliothecaire/home-bibliothecaire/home-bibliothecaire.component';
import { ListeMemberComponent } from './user/bibliothecaire/liste-member/liste-member.component';
import { ListeLivreComponent } from './user/bibliothecaire/liste-livre/liste-livre.component';
import { ListeAutherComponent } from './user/bibliothecaire/liste-auther/liste-auther.component';
import { ConsulterUserComponent } from './user/bibliothecaire/consulter-user/consulter-user.component';

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
  //BIBLIOTHECAIRE
  { path: 'home-bibliothecaire', component: HomeBibliothecaireComponent },
  { path: 'profile-bibliothecaire', component: ProfileMemberComponent },
  { path: 'liste-member', component: ListeMemberComponent },
  { path: 'liste-livre', component: ListeLivreComponent },
  { path: 'liste-auther', component: ListeAutherComponent },
  { path: 'consulter-user', component: ConsulterUserComponent },





];
