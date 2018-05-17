import { Routes, RouterModule } from '@angular/router';
import { BankListComponent } from './bank/bankList/bankList.component';
import { NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { BankDetailComponent } from './bank/bankDetail/bankDetail.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './member/login/login.component';
import { RegisterComponent } from './member/register/register.component';
import { PasswordComponent } from './member/password/password.component';
import { TeamComponent } from './team/team.component';
import { InfoComponent } from './member/info/info.component';
import { UpdateInfoComponent } from './member/update-info/update-info.component';
import { AuthGuard } from './guard/auth-guard';
import { UpdateComponent } from './member/update/update.component';
import { ApplyListComponent } from './apply/apply-list/apply-list.component';
import { ApplyCreateComponent } from './apply/apply-create/apply-create.component';
import { AboutComponent } from './home/about/about.component';
import { FaqComponent } from './home/faq/faq.component';
import { ContactComponent } from './home/contact/contact.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home/about', component: AboutComponent},
  { path: 'home/faq', component: FaqComponent},
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard]},
  { path: 'bank', component: BankListComponent },
  { path: 'bank/:uid', component: BankDetailComponent},
  { path: 'member/login', component: LoginComponent},
  { path: 'member/update', component: UpdateComponent, canActivate: [AuthGuard]},
  { path: 'member/register', component: RegisterComponent},
  { path: 'member/password', component: PasswordComponent},
  { path: 'member/team', component: TeamComponent, canActivate: [AuthGuard]},
  { path: 'member/info', component: InfoComponent, canActivate: [AuthGuard]},
  { path: 'member/info/create', component: UpdateInfoComponent, canActivate: [AuthGuard]},
  { path: 'member/info/:uid', component: UpdateInfoComponent, canActivate: [AuthGuard]},
  { path: 'apply', component: ApplyListComponent, canActivate: [AuthGuard]},
  { path: 'apply/:uid', component: ApplyCreateComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
