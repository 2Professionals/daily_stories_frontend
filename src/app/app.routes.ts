import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { SignupComponent } from '../components/signup/signup.component';
import { MainFeedComponent } from '../components/main-feed/main-feed.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'main-feed', component: MainFeedComponent },
];
