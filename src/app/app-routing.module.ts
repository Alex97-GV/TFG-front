import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogInComponent } from './log-in/log-in.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { SignupComponent } from './signup/signup.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LogInComponent},  
  {path: 'pass-reset', component: PassResetComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
