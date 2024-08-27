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
import { HttpClientModule } from '@angular/common/http';
import { ToUserMapperService } from './mappers/to-user.mapper';
import { UserService } from './services/user.service';
import { ToDataMapperService } from './mappers/to-data.mapper';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { InterestPageComponent } from './pages/interest-page/interest-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { ToAuthorDataMapperService } from './mappers/to-author-data.mapper';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from './charts/charts.module';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ToProfileDataMapperService } from './mappers/to-profile-data.mapper';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LogInComponent,
    PassResetComponent,
    SignupComponent,
    SearchPageComponent,
    InterestPageComponent,
    AuthorPageComponent,
    DataTableComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    ChartsModule,
  ],
  providers: [
    ToUserMapperService,
    ToDataMapperService,
    UserService,
    ToAuthorDataMapperService,
    ToProfileDataMapperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
