import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { TestowyComponent } from "./components/testowy/testowy.component";
import { HttpClientModule } from "@angular/common/http";
import { TournamentsListComponent } from "./components/tournaments-list/tournaments-list.component";
import { MenuComponent } from "./components/menu/menu.component";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TournamentComponent } from "./components/tournament/tournament.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker'

import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatButtonModule
} from "@angular/material";

import { TournamentFormComponent } from "./components/tournament-form/tournament-form.component";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material";
import { MatCheckboxModule } from "@angular/material";
import { MatSelectModule } from "@angular/material";
import { MatOptionModule } from "@angular/material";
import { MainComponent } from './components/main/main.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TestowyComponent,
    TournamentsListComponent,
    MenuComponent,
    TournamentComponent,
    RegisterFormComponent,
    TournamentFormComponent,
    MainComponent,
    LoginFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "pl-pl" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
