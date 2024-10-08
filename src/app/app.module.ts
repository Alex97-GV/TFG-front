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
import { InterestPageComponent } from './pages/interest-page/interest-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { ToAuthorDataMapperService } from './mappers/to-author-data.mapper';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from './charts/charts.module';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ToProfileDataMapperService } from './mappers/to-profile-data.mapper';
import { SocialsTableComponent } from './components/socials-table/socials-table.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NotificationService } from './services/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileGeneralInfoCardComponent } from './components/profile-general-info-card/profile-general-info-card.component';
import { ProfileDataCardComponent } from './components/profile-data-card/profile-data-card.component';
import { SearchPageComponent } from './pages/search-module/search-page/search-page.component';
import { SearchAllPageComponent } from './pages/search-module/search-all-page/search-all-page.component';
import { SearchAuthorsPageComponent } from './pages/search-module/search-authors-page/search-authors-page.component';
import { SearchInterestsPageComponent } from './pages/search-module/search-interests-page/search-interests-page.component';
import { ToMixSearchResponseMapperService } from './mappers/to-mix-search-response.mapper';
import { ToAuthorSearchDataMapperService } from './mappers/to-author-search-data.mapper';
import { FromProfileDataMapperService } from './mappers/from-profile-data.mapper';
import { ToInterestsResponseMapperService } from './mappers/to-interests-response.mapper';
import { UserPrivacyPolicyComponent } from './pages/user-privacy-policy/user-privacy-policy.component';
import { UserTermsAndConditionsComponent } from './pages/user-terms-and-conditions/user-terms-and-conditions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LogInComponent,
    PassResetComponent,
    SignupComponent,
    InterestPageComponent,
    AuthorPageComponent,
    DataTableComponent,
    ProfileComponent,
    SocialsTableComponent,
    ProfileGeneralInfoCardComponent,
    ProfileDataCardComponent,
    SearchPageComponent,
    SearchAllPageComponent,
    SearchAuthorsPageComponent,
    SearchInterestsPageComponent,
    UserPrivacyPolicyComponent,
    UserTermsAndConditionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    ChartsModule,
    NgScrollbarModule,
    ToastrModule.forRoot(),
  ],
  exports: [NgScrollbarModule],
  providers: [
    ToastrService,
    NotificationService,
    ToUserMapperService,
    UserService,
    ToAuthorDataMapperService,
    ToProfileDataMapperService,
    ToMixSearchResponseMapperService,
    ToAuthorSearchDataMapperService,
    FromProfileDataMapperService,
    ToInterestsResponseMapperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
