import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { NetService } from './service/net.service';
import { BankService } from './service/bank.service';
import { AppRoutingModule } from './app.routing';
import { BankListComponent } from './bank/bankList/bankList.component';
import { BankDetailComponent } from './bank/bankDetail/bankDetail.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ToastService, ComponentModule } from './component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { TeamComponent } from './team/team.component';
import { LoginComponent } from './member/login/login.component';
import { RegisterComponent } from './member/register/register.component';
import { PasswordComponent } from './member/password/password.component';
import { UpdateComponent } from './member/update/update.component';
import { InfoComponent } from './member/info/info.component';
import { UpdateInfoComponent } from './member/update-info/update-info.component';
import { AuthGuard } from './guard/auth-guard';
import { MemberService } from './service/member.service';
import { TokenService } from './service/token.service';
import { ApplyListComponent } from './apply/apply-list/apply-list.component';
import { ApplyCreateComponent } from './apply/apply-create/apply-create.component';
import { FaqComponent } from './home/faq/faq.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    BankListComponent,
    BankDetailComponent,
    IndexComponent,
    HomeComponent,
    WalletComponent,
    TeamComponent,
    LoginComponent,
    RegisterComponent,
    PasswordComponent,
    UpdateComponent,
    InfoComponent,
    UpdateInfoComponent,
    ApplyListComponent,
    ApplyCreateComponent,
    FaqComponent,
    AboutComponent,
    ContactComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentModule
  ],
  providers: [
    NetService,
    BankService,
    ToastService,
    AuthGuard,
    MemberService,
    TokenService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
