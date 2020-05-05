import { TournamentAcceptationComponent } from "./components/tournament-acceptation/tournament-acceptation.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { TournamentsListComponent } from "./components/tournaments-list/tournaments-list.component";
import { MenuComponent } from "./components/menu/menu.component";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TournamentComponent } from "./components/tournament/tournament.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from "@angular-material-components/datetime-picker";

import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatRadioModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule,
} from "@angular/material";

import { registerLocaleData } from "@angular/common";
import localePl from "@angular/common/locales/pl";
registerLocaleData(localePl);

import { TournamentFormComponent } from "./components/tournament-form/tournament-form.component";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material";
import { MatCheckboxModule } from "@angular/material";
import { MatSelectModule } from "@angular/material";
import { MatOptionModule } from "@angular/material";
import { MainComponent } from "./components/main/main.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { ToastrModule } from "ngx-toastr";
import { StartPageComponent } from "./components/start-page/start-page.component";
import { authInterceptorProviders } from "./services/auth/auth-interceptor.service";
import { FormsModule } from "@angular/forms";

import { MyTournamentsComponent } from "./components/my-tournaments/my-tournaments.component";
import { TournamentMatchesComponent } from "./components/tournament-matches/tournament-matches.component";
import { MyMatchesComponent } from "./components/my-matches/my-matches.component";
import { ResultFormComponent } from './components/result-form/result-form.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { NextRoundComponent } from './components/next-round/next-round.component';
import { MyInvitationsComponent } from './components/my-invitations/my-invitations.component';
import { InvitationDetailComponent } from './components/invitation-detail/invitation-detail.component';
import { InviteDialogComponent } from './components/invite-dialog/invite-dialog.component';
import { MatchDateFormComponent } from './components/match-date-form/match-date-form.component';



@NgModule({
  declarations: [
    AppComponent,
    TournamentsListComponent,
    MenuComponent,
    TournamentComponent,
    RegisterFormComponent,
    TournamentFormComponent,
    MainComponent,
    LoginFormComponent,
    StartPageComponent,
    MyTournamentsComponent,
    TournamentMatchesComponent,
    MyMatchesComponent,
    TournamentAcceptationComponent,
    ResultFormComponent,
    UserSettingsComponent,
    UserPasswordComponent,
    NextRoundComponent,
    MyInvitationsComponent,
    InvitationDetailComponent,
    InviteDialogComponent,
  ],
  entryComponents: [
    TournamentAcceptationComponent,
    UserSettingsComponent,
    UserPasswordComponent,
    InvitationDetailComponent,
    InviteDialogComponent
    MatchDateFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTabsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pl-pl" },
    { provide: LOCALE_ID, useValue: "pl-pl" },
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
