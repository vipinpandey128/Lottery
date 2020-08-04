import { UserProfileService } from './Profile/service/user-profile.service';
import { AngularMaterialModule } from './module/angular-material.module';
import { NotificationService } from './services/Notification.service';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { AgentAuthGuardService } from './AuthGuard/AgentAuthGuardService';
import { BetComponent } from './Bet/Bet.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { SchemeComponent } from './SchemeMasters/app.Scheme.Component';
import { RoleComponent } from './RoleMaster/app.Role.component';
import { UserRegistrationComponent } from './CreateUsers/app.UserRegistration.component';
import { EditUserRegistrationComponent } from './CreateUsers/app.EditUserRegistration.Component';
import { AssignRoleComponent } from './AssignRole/app.AssignRole.Component';
import { LoginComponent } from './Login/app.LoginComponent';
import { AppAdminLayoutComponent } from './_layout/app-adminlayout.component';
import { UserDashboardComponent } from './UserDashboard/app.UserDashboardComponent';
import { AdminDashboardComponent } from './AdminDashboard/app.AdminDashboardComponent';
import { AppUserLayoutComponent } from './_layout/app-userlayout.component';
import { AdminLogoutComponent } from './Login/app.AdminLogout.Component';
import { UserLogoutComponent } from './Login/app.UserLogout.Component';
import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';
import { UserAuthGuardService } from './AuthGuard/UserAuthGuardService';
import { AddMoneyComponent } from './AddMoney/AddMoney.component';
import { DepositMoneyComponent } from './DepositMoney/DepositMoney.component';
import { AgentDashboardComponent } from './AgentDashboard/AgentDashboard.component';
import { ProfileComponent } from './Profile/Profile.component';
import { UserTransactionComponent } from './UserTransaction/UserTransaction.component';
import { AgentTransactionComponent } from './AgentTransaction/AgentTransaction.component';
import { AdminTransactionComponent } from './AdminTransaction/AdminTransaction.component';
import { AllTransactionComponent } from './AllTransaction/AllTransaction.component';
import { GameComponent } from './Game/Game.component';
import { AgentUserComponent } from './AgentUser/AgentUser.component';
import { AppAgentLayoutComponent } from './_layout/app-agent-layout.component';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderService } from './services/loader.service';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { IpAddressService } from './services/IpAddress.service';
import { DialogBalComponent } from './components/my-loader/dialog-bal.component';


@NgModule({
  declarations: [
    AppComponent,
    AppAdminLayoutComponent,
    AppUserLayoutComponent,
    SchemeComponent,
    RoleComponent,
    UserRegistrationComponent,
    EditUserRegistrationComponent,
    AssignRoleComponent,
    LoginComponent,
    AdminLogoutComponent,
    UserLogoutComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    AddMoneyComponent,
    DepositMoneyComponent,
    AgentDashboardComponent,
    ProfileComponent,
    UserTransactionComponent,
    AgentTransactionComponent,
    AdminTransactionComponent,
    AllTransactionComponent,
    GameComponent,
    BetComponent,
    AgentUserComponent,
    AppAgentLayoutComponent,
    MyLoaderComponent,
    WithdrawalComponent,
    DialogBalComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularMaterialModule,
  ],
  exports: [BsDatepickerModule],
  providers: [
    NotificationService,
    DatePipe,
    AdminAuthGuardService,
    UserAuthGuardService,
    AgentAuthGuardService,
    LoaderService,
    IpAddressService, 
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogBalComponent],
})
export class AppModule {}
