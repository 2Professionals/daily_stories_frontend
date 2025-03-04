import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { SignupComponent } from '../components/signup/signup.component';
import { MainFeedComponent } from '../components/main-feed/main-feed.component';
import { AuthGuard } from '../guards/authentication.guards';
import { AccessDeniedComponent } from '../components/access-denied/access-denied.component';
import { ProfileInformationsComponent } from '../components/profile-informations/profile-informations.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { SecuritySettingsComponent } from '../components/security-settings/security-settings.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'main-feed', component: MainFeedComponent, canActivate: [AuthGuard] },
  { 
    path: 'account-settings', 
    component: AccountSettingsComponent,
    children: [
      { path: 'profile-informations', component: ProfileInformationsComponent },
      { path: 'security-settings', component: SecuritySettingsComponent }
    ]
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: 'access-denied' },
];

