import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PassResetComponent } from './pages/pass-reset/pass-reset.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { InterestPageComponent } from './pages/interest-page/interest-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { authorizeGuard } from './guards/authorize.guard';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
    canActivate: [authorizeGuard],
    component: SignupComponent,
  },
  {
    path: 'interests',
    canActivate: [authorizeGuard],
    component: InterestPageComponent,
  },
  {
    path: 'profile',
    canActivate: [authorizeGuard],
    component: PerfilComponent,
  },
  {
    path: 'author/:id',
    children: [
      {
        path: '',
        canActivate: [authorizeGuard],
        component: AuthorPageComponent,
      },
    ],
  },
  {
    path: 'search/:key',
    children: [
      {
        path: '',
        canActivate: [authorizeGuard],
        component: SearchPageComponent,
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
