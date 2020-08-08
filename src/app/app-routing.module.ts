import { TicketComponent } from './Ticket/Ticket.component';
import { TermsComponent } from './terms/terms.component';
import { PostWinningComponent } from './post-winning/post-winning.component';
import { UserAuthGuardService } from './AuthGuard/UserAuthGuardService';
import { UserDashboardComponent } from './UserDashboard/app.UserDashboardComponent';
import { AppUserLayoutComponent } from './_layout/app-userlayout.component';
import { AdminDashboardComponent } from './AdminDashboard/app.AdminDashboardComponent';
import { Routes, RouterModule } from '@angular/router';
import { AppAdminLayoutComponent } from './_layout/app-adminlayout.component';
import { RoleComponent } from './RoleMaster/app.Role.component';
import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';
import { UserRegistrationComponent } from './CreateUsers/app.UserRegistration.component';
import { AssignRoleComponent } from './AssignRole/app.AssignRole.Component';
import { SchemeComponent } from './SchemeMasters/app.Scheme.Component';
import { GameComponent } from './Game/Game.component';
import { AddMoneyComponent } from './AddMoney/AddMoney.component';
import { AllTransactionComponent } from './AllTransaction/AllTransaction.component';
import { ProfileComponent } from './Profile/Profile.component';
import { AppAgentLayoutComponent } from './_layout/app-agent-layout.component';
import { AgentUserComponent } from './AgentUser/AgentUser.component';
import { AgentAuthGuardService } from './AuthGuard/AgentAuthGuardService';
import { DepositMoneyComponent } from './DepositMoney/DepositMoney.component';
import { AgentDashboardComponent } from './AgentDashboard/AgentDashboard.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { AgentTransactionComponent } from './AgentTransaction/AgentTransaction.component';
import { LoginComponent } from './Login/app.LoginComponent';
import { AdminLogoutComponent } from './Login/app.AdminLogout.Component';
import { UserLogoutComponent } from './Login/app.UserLogout.Component';
import { AgentLogoutComponent } from './Login/agent-logout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  //Admin path
  {
    path: 'Role',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'Add',
        component: RoleComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'User',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'Add',
        component: UserRegistrationComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'Assign',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'Role',
        component: AssignRoleComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'Scheme',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'Add',
        component: SchemeComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'Game',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'Add',
        component: GameComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'Admin',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'Dashboard',
        component: AdminDashboardComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'AgentMoney',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'Add',
        component: AddMoneyComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'AllTransaction',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'View',
        component: AllTransactionComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'PostWining',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'View',
        component: PostWinningComponent,
        canActivate: [AdminAuthGuardService],
      },
    ],
  },
  {
    path: 'Profile',
    component: AppAdminLayoutComponent,
    children: [
      {
        path: 'Admin',
        component: ProfileComponent
      },
    ],
  },

  //agent path
  {
    path: 'AgentUser',
    component: AppAgentLayoutComponent,
    children: [
      {
        path: 'CreateUser',
        component: AgentUserComponent,
        canActivate: [AgentAuthGuardService],
      },
    ],
  },

  {
    path: 'Agent',
    component: AppAgentLayoutComponent,
    children: [
      {
        path: 'Dashboard',
        component: AgentDashboardComponent,
        canActivate: [AgentAuthGuardService],
      },
    ],
  },
  {
    path: 'Agent',
    component: AppAgentLayoutComponent,
    children: [
      {
        path: 'Withdrawal',
        component: WithdrawalComponent,
        canActivate: [AgentAuthGuardService],
      },
    ],
  },
  {
    path: 'Agent',
    component: AppAgentLayoutComponent,
    children: [
      {
        path: 'Transaction',
        component: AgentTransactionComponent,
        canActivate: [AgentAuthGuardService],
      },
    ],
  },
  {
    path: 'Profile',
    component: AppAgentLayoutComponent,
    children: [
      {
        path: 'Agent',
        component: ProfileComponent
      },
    ],
  },
  //user path
  {
    path: 'Client',
    component: AppUserLayoutComponent,
    children: [
      {
        path: 'Dashboard',
        component: UserDashboardComponent,
        canActivate: [UserAuthGuardService],
      },
    ],
  },
  {
    path: 'Ticket',
    component: AppUserLayoutComponent,
    children: [
      {
        path: 'Bet',
        component: TicketComponent,
        canActivate: [UserAuthGuardService],
      },
    ],
  },
  {
    path: 'Profile',
    component: AppUserLayoutComponent,
    children: [
      {
        path: 'User',
        component: ProfileComponent
      },
    ],
  },
  { path: 'terms', component: TermsComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'AdminLogout', component: AdminLogoutComponent },
  { path: 'UserLogout', component: UserLogoutComponent },
  { path: 'AgentLogout', component: AgentLogoutComponent },
  { path: 'Profile', component: ProfileComponent },

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: '**', redirectTo: 'Login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
