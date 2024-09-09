import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PassResetComponent } from './pages/pass-reset/pass-reset.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InterestPageComponent } from './pages/interest-page/interest-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { authorizeGuard } from './guards/authorize.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchPageComponent } from './pages/search-module/search-page/search-page.component';
import { SearchInterestsPageComponent } from './pages/search-module/search-interests-page/search-interests-page.component';
import { SearchAuthorsPageComponent } from './pages/search-module/search-authors-page/search-authors-page.component';
import { SearchAllPageComponent } from './pages/search-module/search-all-page/search-all-page.component';
import { UserPrivacyPolicyComponent } from './pages/user-privacy-policy/user-privacy-policy.component';
import { UserTermsAndConditionsComponent } from './pages/user-terms-and-conditions/user-terms-and-conditions.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authorizeGuard],
    component: HomeComponent,
  },
  {
    path: 'pass-reset',
    canActivate: [authorizeGuard],
    component: PassResetComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'userPrivacyPolicy',
    component: UserPrivacyPolicyComponent,
  },
  {
    path: 'userTermsAndConditions',
    component: UserTermsAndConditionsComponent,
  },
  {
    path: 'interests',
    canActivate: [authorizeGuard],
    component: InterestPageComponent,
  },
  {
    path: 'profile',
    canActivate: [authorizeGuard],
    component: ProfileComponent,
  },
  {
    path: 'author/:id',
    canActivate: [authorizeGuard],
    component: AuthorPageComponent,
  },
  {
    path: 'search',
    canActivate: [authorizeGuard],
    component: SearchPageComponent,
    children: [
      {
        path: 'all/:key',
        canActivate: [authorizeGuard],
        component: SearchAllPageComponent,
      },
      {
        path: 'interests/:key',
        canActivate: [authorizeGuard],
        component: SearchInterestsPageComponent,
      },
      {
        path: 'authors/:key',
        canActivate: [authorizeGuard],
        component: SearchAuthorsPageComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
