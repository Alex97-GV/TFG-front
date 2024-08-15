import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PassResetComponent } from './pages/pass-reset/pass-reset.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { ToUserMapperService } from './mappers/to-user.mapper';
import { UserService } from './services/user.service';
import { ToDataMapperService } from './mappers/to-data.mapper';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { InterestPageComponent } from './pages/interest-page/interest-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { ToAuthorDataMapperService } from './mappers/to-author-data.mapper';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LogInComponent,
    PassResetComponent,
    SignupComponent,
    PerfilComponent,
    SearchPageComponent,
    InterestPageComponent,
    AuthorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ToUserMapperService, ToDataMapperService, UserService, ToAuthorDataMapperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
